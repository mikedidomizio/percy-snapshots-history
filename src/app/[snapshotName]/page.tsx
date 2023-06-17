import {fetchBuilds} from "@/api/fetchBuilds";
import {getApprovedBuilds} from "@/lib/getApprovedBuilds";
import {listSnapshots} from "@/api/listSnapshots";
import {getApprovedSnapshotsDiff} from "@/lib/getApprovedSnapshotsDiff";
import {getSpecificSnapshot} from "@/lib/getSpecificSnapshot";
import {getSnapshot} from "@/api/getSnapshot";
import {getImageByDimensions} from "@/lib/getImageByDimensions";
import Image from "next/image";
import Link from "next/link";

type RouteParams = {
    snapshotName: string
}

type Image = {
    src: string
    width: number
    height: number
}

type BuildsJson = {
    buildUrl: string,
    buildId: string,
    buildNumber: number
    images: Image[]
}

async function getPercy(snapshotName: string) {
    const builds = await fetchBuilds(process.env.PERCY_PROJECT_SLUG || '')
    const buildsJson: BuildsJson[] = []

    for (let build of getApprovedBuilds(builds.data)) {
        const snapshots = await listSnapshots(build.id)

        const diffedSnapshots = getApprovedSnapshotsDiff(snapshots.data)
        const snapshot = getSpecificSnapshot(diffedSnapshots, decodeURIComponent(snapshotName))

        if (snapshot) {
            const snapshotAttr = await getSnapshot(snapshot.id)
            const image = getImageByDimensions((snapshotAttr as any).included)

            buildsJson.push({
                buildUrl: build.attributes["web-url"],
                buildId: build.id,
                buildNumber: build.attributes["build-number"],
                // we default because if the image is busted, we still want the build to render
                images: [{
                    src: image?.attributes.url || '',
                    height: image?.attributes.height || 0,
                    width: image?.attributes.width || 0
                }]
            })
        }
    }

    return {
        buildsJson,
    }
}



export default async function Page({ params }: { params: RouteParams }) {
    const percy = getPercy(params.snapshotName)
    const [percyData] = await Promise.all([percy])

    return (
        <main className="flex min-h-screen p-24">
            {percyData.buildsJson.map((build) => {
                return <div>
                    <Link href={build.buildUrl} target="_blank">{build.buildNumber}</Link>
                    <Image key={build.images[0].src} src={build.images[0].src} alt="" width={build.images[0].width} height={build.images[0].height} />
                </div>
            })}
        </main>
    )
}
