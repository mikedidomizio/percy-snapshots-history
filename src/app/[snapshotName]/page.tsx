import {fetchBuilds} from "@/api/fetchBuilds";
import {getApprovedBuilds} from "@/lib/getApprovedBuilds";
import {listSnapshots} from "@/api/listSnapshots";
import {getApprovedSnapshotsDiff} from "@/lib/getApprovedSnapshotsDiff";
import {getSpecificSnapshot} from "@/lib/getSpecificSnapshot";
import {getSnapshot} from "@/api/getSnapshot";
import {getImageByDimensions} from "@/lib/getImageByDimensions";
import Image from "next/image";

type RouteParams = {
    snapshotName: string
}

async function getPercy(snapshotName: string) {
    const builds = await fetchBuilds(process.env.PERCY_PROJECT_SLUG || '')
    const images = [];

    for (let build of getApprovedBuilds(builds.data)) {
        const snapshots = await listSnapshots(build.id)

        const diffedSnapshots = getApprovedSnapshotsDiff(snapshots.data)
        const snapshot = getSpecificSnapshot(diffedSnapshots, decodeURIComponent(snapshotName))

        if (snapshot) {
            const snapshotAttr = await getSnapshot(snapshot.id)
            const image = getImageByDimensions((snapshotAttr as any).included)

            if (image) {
                images.push(image.attributes.url)
            }
        }
    }

    return {
        images,
    }
}



export default async function Page({ params }: { params: RouteParams }) {
    const percy = getPercy(params.snapshotName)
    const [percyData] = await Promise.all([percy])

    return (
        <main className="flex min-h-screen p-24">
            {percyData.images.map(image => {
                return <Image key={image} src={image} alt="" width={600} height={400} />
            })}
        </main>
    )
}
