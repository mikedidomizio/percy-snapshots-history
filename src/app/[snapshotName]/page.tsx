import {List} from "@/components/List";
import {getPercy} from "@/app/api/get-builds/[buildId]/route";
import Link from "next/link";

type RouteParams = {
    snapshotName: string
}

export default async function Page({ params }: { params: RouteParams }) {
    const percy = getPercy(params.snapshotName)
    const [percyData] = await Promise.all([percy])

    return (
        <main className="flex min-h-screen p-24">
            <Link href="/">Home</Link>
            <List percyData={percyData} snapshotName={params.snapshotName} />
        </main>
    )
}
