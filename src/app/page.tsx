import {listBuilds} from "@/api/listBuilds";
import {listSnapshots} from "@/api/listSnapshots";
import Link from "next/link";
import {cookies} from "next/headers";

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

export default async function Home() {
    const [percyData] = await Promise.all([apiCalls()]);
    const cookieStore = cookies()
    const organizationId = cookieStore.get('organizationId')

    return (
    <main className="min-h-screen p-24">
        {organizationId ? (
        <>List of recent snapshots:
        <ul>
            {percyData.snapshots.sort().map((snapshot) => {
                return <li>
                    <Link prefetch={false} key={snapshot} href={`./${snapshot}`}>{snapshot}</Link>
                </li>
            })}
        </ul></>) : null}
    </main>
  )
}
