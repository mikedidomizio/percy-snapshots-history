'use client'
import {useState} from "react";
import Link from "next/link";
import Image from "next/image";

export const List = ({ percyData, snapshotName }: { percyData: any, snapshotName: string }) => {
    const [fetching, setFetching] = useState(false)
    const [buildsJson, setBuildsJson] = useState(percyData.buildsJson)
    const [lastBuildId, setLastBuildId] = useState(percyData.lastBuildId)
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
    }

    return <div>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3 mb-6">
            {buildsJson.map((build: any) => {
                return <div key={build.buildUrl}>
                    <Link href={build.buildUrl} target="_blank">{build.buildNumber}</Link>
                    <Image src={build.images[0].src} alt="" width={build.images[0].width} height={build.images[0].height} />
                </div>
            })}
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" disabled={fetching} onClick={handleFetchMore}>
            {fetching ? 'Fetching' : 'Search 100 more builds'}</button>
    </div>
}
