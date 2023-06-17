import {fetchBuilds} from "@/api/fetchBuilds";
import {listSnapshots} from "@/api/listSnapshots";
import Link from "next/link";

const apiCalls = async () => {
    const percy = await fetchBuilds(process.env.PERCY_PROJECT_SLUG || '', undefined, 1)
    const snapshots = await listSnapshots(percy.data[0].id)

    const mappedSnapshots = snapshots.data.map(snapshot => {
        return snapshot.attributes.name
    })

    return {
        snapshots: mappedSnapshots
    }
}

export default async function Home() {
    const percy = apiCalls()
    const [percyData] = await Promise.all([percy])

    return (
    <main className="min-h-screen p-24">
        <h1>Percy Snapshot Compare</h1>

        <p>
            List of recent snapshots:
            <ul>
                {percyData.snapshots.sort().map((snapshot) => {
                    return <li>
                        <Link key={snapshot} href={`./${snapshot}`}>{snapshot}</Link>
                    </li>
                })}
            </ul>
        </p>
    </main>
  )
}
