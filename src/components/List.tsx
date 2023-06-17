'use client'
import {useState} from "react";
import Link from "next/link";
import {PercyImage} from "@/components/PercyImage";
import {BuildsJson} from "@/app/api/get-builds/[buildId]/route";

export const List = ({ percyData, snapshotName }: { percyData: any, snapshotName: string }) => {
    const [fetching, setFetching] = useState(false)
    const [buildsJson, setBuildsJson] = useState(percyData.buildsJson)
    const [lastBuildId, setLastBuildId] = useState(percyData.lastBuildId)
    const [lastBuildNumber, setLastBuildNumber] = useState(percyData.lastBuildNumber)

    const handleFetchMore = async () => {
        setFetching(true)
        const results = await fetch(`/api/get-builds/${lastBuildId}?snapshotName=${snapshotName}`)
        const json = await results.json()
        setBuildsJson([
            ...buildsJson,
            ...json.buildsJson,
        ])
        setLastBuildId(json.lastBuildId)
        setFetching(false)
        setLastBuildNumber(json.lastBuildNumber)
    }

    return <div>
        <p className="mb-6">
            General Information:
            <br/>
            Last build ID: {lastBuildId}
            <br/>
            Last Build Number to search: {lastBuildNumber}
        </p>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3 mb-6">
            {buildsJson.map((build: BuildsJson) => {
                return <div key={build.buildUrl}>
                    Build Number: <Link href={build.buildUrl} target="_blank">{build.buildNumber}</Link>
                    <br/>
                    Branch: {build.branch}
                    <br/>
                    Created At: {`${build.createdAt}`}
                    {build.buildItem ?
                        <Link href={build.buildUrl} target="_blank">
                            <PercyImage hoverImage={build.buildItem.attributes["cover-head-screenshot-image-url"]} baseImage={build.buildItem.attributes["cover-diff-image-url"]} /></Link> : 'could not find image'
                    }
                </div>
            })}
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" disabled={fetching} onClick={handleFetchMore}>
            {fetching ? 'Fetching' : 'Fetch more builds'}</button>
    </div>
}
