'use client'
import {useState} from "react";
import Link from "next/link";
import Image from "next/image";

export const List = ({ percyData, snapshotName }: { percyData: any, snapshotName: string }) => {
    const [buildsJson, setBuildsJson] = useState(percyData.buildsJson)
    const [lastBuildId, setLastBuildId] = useState(percyData.lastBuildId)
    const handleFetchMore = async () => {
        const results = await fetch(`/api/get-builds/${lastBuildId}?snapshotName=${snapshotName}`)
        const json = await results.json()
        setBuildsJson([
            ...buildsJson,
            ...json.buildsJson,
        ])
        setLastBuildId(json.lastBuildId)
    }

    return <div>
        {buildsJson.map((build: any) => {
            return <div style={{ float: "left", maxHeight: "500px", maxWidth: "400px" }} key={build.buildUrl}>
                <Link href={build.buildUrl} target="_blank">{build.buildNumber}</Link>
                <Image src={build.images[0].src} alt="" width={build.images[0].width} height={build.images[0].height} />
            </div>
        })}
        <button onClick={handleFetchMore}>Fetch more</button>
    </div>
}
