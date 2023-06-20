'use client'
import {useState} from "react";
import {BuildsJson} from "@/app/api/get-builds/[buildId]/route";
import {PercySnapshotCard} from "@/components/PercySnapshotCard";
import {isDevelopmentMode} from "@/lib/isDevelopmentMode";

export const List = ({ percyData, snapshotName }: { percyData: any, snapshotName: string }) => {
    const [fetching, setFetching] = useState(false)
    const [buildsJson, setBuildsJson] = useState(percyData.buildsJson)
    const [lastBuildId, setLastBuildId] = useState(percyData.lastBuildId)
    const [lastBuildNumber, setLastBuildNumber] = useState(percyData.lastBuildNumber)

    const fetchCall = async (lastBuildId: string, snapshotName: string) => {
        const results = await fetch(`/api/get-builds/${lastBuildId}?snapshotName=${snapshotName}`)
        return results.json()
    }

    const handleFetchMore = async (numberOfRequests: number = 1) => {
        setFetching(true)
        let results = [...buildsJson]
        let json

        let tempLastBuildId = lastBuildId
        let tempLastBuildNumber = lastBuildNumber

        for (let i = 0; i < numberOfRequests; i++ ) {
            json = await fetchCall(tempLastBuildId, snapshotName)

            tempLastBuildId = json.lastBuildId
            tempLastBuildNumber = json.lastBuildNumber

            results = [
                ...results,
                ...json.buildsJson,
            ]

            // as requests are being made we can update the UI
            setBuildsJson(results)
        }

        setLastBuildId(json.lastBuildId)
        setFetching(false)
        setLastBuildNumber(json.lastBuildNumber)
    }

    return <div className="w-full">
        {isDevelopmentMode ? <p className="mb-6">
            General Information:
            <br/>
            Last build ID: {lastBuildId}
            <br/>
            Last Build Number to search: {lastBuildNumber}
        </p> : null}
        <div className="mb-6">
            {buildsJson.length === 0 ? 'Click one of the buttons below to fetch more' : null}

            {buildsJson.length ? <div className="flex flex-wrap gap-6">
                        {buildsJson.map((build: BuildsJson) => {
                            return <PercySnapshotCard
                                buildNumber={build.buildNumber}
                                buildUrl={build.buildUrl}
                                key={build.buildNumber}
                                branchName={build.branch} image={build.buildItem?.attributes["cover-diff-image-url"] ?? null}
                                imageOnHover={build.buildItem?.attributes["cover-head-screenshot-image-url"] ?? null}
                            />
                    })}
                </div>
            : null}
        </div>
        <div className="space-x-6">
            <button className="btn btn-primary" disabled={fetching} onClick={() => handleFetchMore(1)}>
                {fetching ? 'Fetching' : 'Fetch more builds'}</button>

            <button className="btn btn-primary" disabled={fetching} onClick={() => handleFetchMore(5)}>
                {fetching ? 'Fetching' : 'Fetch a bunch'}</button>
        </div>

    </div>
}
