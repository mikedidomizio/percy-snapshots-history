import {List} from "@/components/List";
import {getPercy} from "@/app/api/get-builds/[buildId]/route";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

type RouteParams = {
    snapshotName: string
}

export default async function Page({ params }: { params: RouteParams }) {
    const cookieStore = cookies()

    if (!cookieStore.has('organizationId')) {
        redirect('/')
    }

    const percy = getPercy(params.snapshotName)
    const [percyData] = await Promise.all([percy])

    return (
        <main className="flex p-6">
            <List percyData={percyData} snapshotName={params.snapshotName} />
        </main>
    )
}
