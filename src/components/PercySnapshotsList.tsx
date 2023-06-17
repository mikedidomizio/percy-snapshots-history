'use client'
import Link from "next/link";
import {useOrganization} from "@/stores/organization.store";
import {useEffect, useState} from "react";

// todo proper type and maybe better name
export const PercySnapshotsList = ({ percyData }: { percyData: any}) => {
    const organizationId = useOrganization((state) => state.organizationId)
    const [snapshots, setSnapshots] = useState(percyData?.snapshots)

    useEffect(() => {
        const fetchSnapshots = async() => {
            const response = await fetch('/api/list-snapshots')
            const json = await response.json()
            setSnapshots(json.snapshots)
        }

        if (organizationId) {
            void fetchSnapshots()
        }
    }, [organizationId])

    if (!snapshots) {
        return null
    }

    return <>
        List of recent snapshots:
        <ul>
            {snapshots?.sort().map((snapshot: string) => {
            return <li key={snapshot}>
                    <Link prefetch={false} href={`./${snapshot}`}>{snapshot}</Link>
                </li>
            })}
        </ul>
    </>
}
