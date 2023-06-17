import {fetchBuilds} from "@/api/fetchBuilds";
import {getApprovedBuilds} from "@/lib/getApprovedBuilds";
import {listSnapshots} from "@/api/listSnapshots";
import {getApprovedSnapshotsDiff} from "@/lib/getApprovedSnapshotsDiff";
import {getSpecificSnapshot} from "@/lib/getSpecificSnapshot";
import {getSnapshot} from "@/api/getSnapshot";
import {getImageByDimensions} from "@/lib/getImageByDimensions";
import {NextRequest, NextResponse} from "next/server";

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

export async function getPercy(snapshotName: string, lastBuildId?: string) {
    const builds = await fetchBuilds(process.env.PERCY_PROJECT_SLUG || '', lastBuildId)
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
        lastBuildId: builds.data[builds.data.length - 1].id
    }
}

export async function GET(req: NextRequest, res: NextResponse) {
    const url = new URL(req.url)

    if (!url.searchParams.get("snapshotName")) {
        // todo better error handler
        throw new Error('need snapshot name')
    }

    const splitPathname = url.pathname.split('/')
    const response = await getPercy(url.searchParams.get("snapshotName") || '', splitPathname[splitPathname.length - 1])

    return NextResponse.json(response)
}
