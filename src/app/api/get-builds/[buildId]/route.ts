import {listBuilds} from "@/api/percy/single-requests/listBuilds";
import {getApprovedBuilds} from "@/lib/getApprovedBuilds";
import {NextRequest, NextResponse} from "next/server";
import {BuildItem} from "@/types/percy/buildItems";
import {cookies} from "next/headers";
import {getBuildItems} from "@/api/percy/single-requests/getBuildItems";

export type BuildsJson = {
    authorName?: string
    branch: string,
    buildUrl: string,
    buildId: string,
    buildNumber: number
    buildItem: BuildItem | null
    createdAt: Date | null
    totalComparisons: number | null
}

const getBuildItemsForBuild = async(buildId: string) => {
    const cookieStore = cookies()
    const organizationId= cookieStore.get('organizationId')
    const token = cookieStore.get('token')

    if (!organizationId) {
        return
    }

    return getBuildItems(token?.value as string, {
        'organization-id': organizationId.value,
        'build-id': buildId,
        category: 'changed',
        subcategories: ['approved'],
        browser_ids: ['36', '38', '39'],
        // todo hard coded values problematic
        widths: ['1440', '1576'],
    })
}


export async function getPercy(snapshotName: string, lastBuildId?: string) {
    const cookieStore = cookies()
    const projectSlug = cookieStore.get('projectSlug')
    const token = cookieStore.get('token')
    let options = {}

    if (lastBuildId) {
        options = {
            page: {
                cursor: lastBuildId
            }
        }
    }

    const builds = await listBuilds(token?.value as string, projectSlug?.value as string, options)
    const buildsJson: BuildsJson[] = []

    for (let build of getApprovedBuilds(builds.data)) {
        const buildItemsResponse = await getBuildItemsForBuild(build.id)
        const buildItemImage = buildItemsResponse?.data.find(buildItem => {
            return decodeURIComponent(snapshotName) === buildItem.attributes['cover-snapshot-name']
        })

        // if undefined, it means that the snapshot wasn't part of a diff, we don't want to return it
        if (buildItemImage) {
            buildsJson.push({
                branch: build.attributes.branch,
                buildUrl: build.attributes["web-url"],
                buildId: build.id,
                buildNumber: build.attributes["build-number"],
                // we default because if the image is busted, we still want the build item to render, just without an image
                buildItem: buildItemImage || null,
                createdAt: build.attributes["created-at"] || null,
                totalComparisons: build.attributes["total-comparisons"]
            })
        }
    }

    return {
        buildsJson,
        lastBuildId: builds.data[builds.data.length - 1]?.id ?? null,
        lastBuildNumber: builds.data[builds.data.length - 1]?.attributes["build-number"] ?? null
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
