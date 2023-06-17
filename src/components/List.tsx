'use client'
import {useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {useOrganization} from "@/stores/organization.store";
import {PercyImage} from "@/components/PercyImage";

export const List = ({ percyData, snapshotName }: { percyData: any, snapshotName: string }) => {
    const [fetching, setFetching] = useState(false)
    const [buildsJson, setBuildsJson] = useState(percyData.buildsJson)
    // todo temporary
    const [lastBuildId, setLastBuildId] = useState("27991895")
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
        Last Build Number: {lastBuildNumber}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3 mb-6">
            {buildsJson.map((build: any) => {
                return <div key={build.buildUrl}>
                    <Link href={build.buildUrl} target="_blank">{build.buildNumber}</Link>
                    {build.buildItem ?
                        <PercyImage baseImage={build.buildItem.attributes["cover-head-screenshot-image-url"]} hoverImage={build.buildItem.attributes["cover-diff-image-url"]} /> : 'could not find image'
                    }
                </div>
            })}
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" disabled={fetching} onClick={handleFetchMore}>
            {fetching ? 'Fetching' : 'Fetch more builds'}</button>
    </div>
}
