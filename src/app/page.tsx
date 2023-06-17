import {listBuilds} from "@/api/listBuilds";
import {listSnapshots} from "@/api/listSnapshots";
import Link from "next/link";
import {getProject} from "@/api/getProject";
import {setOrganizationId, useOrganization} from "@/stores/organization.store";
import {useEffect} from "react";

const apiCalls = async () => {
    const percy = await listBuilds(process.env.PERCY_PROJECT_SLUG || '', undefined, 1);
    const snapshots = await listSnapshots(percy.data[0].id);

    const mappedSnapshots = snapshots.data.map(snapshot => {
        return snapshot.attributes.name
    });

    return {
        snapshots: mappedSnapshots
    }
};

const getOrg = async() => {
    const organization = await getProject(process.env.PERCY_PROJECT_SLUG || '');
    setOrganizationId(organization.data.relationships.organization.data.id);

    return organization
};

export default async function Home() {
    const [orgData, percyData] = await Promise.all([getOrg(), apiCalls()]);

    return (
    <main className="min-h-screen p-24">
        <h1>Percy Snapshot Compare</h1>
        List of recent snapshots:
        <ul>
            {percyData.snapshots.sort().map((snapshot) => {
                return <li>
                    <Link key={snapshot} href={`./${snapshot}`}>{snapshot}</Link>
                </li>
            })}
        </ul>
    </main>
  )
}
