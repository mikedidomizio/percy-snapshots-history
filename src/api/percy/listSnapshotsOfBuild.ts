import {cookies} from "next/headers";
import {listBuilds} from "@/api/percy/single-requests/listBuilds";
import {listSnapshots} from "@/api/percy/single-requests/listSnapshots";
import {State} from "@/types/percy/builds";

export type ListSnapshotsOfBuildResponse = { snapshots: string[] } | null

export const listSnapshotsOfBuild = async(): Promise<ListSnapshotsOfBuildResponse> => {
    const cookieStore = cookies()
    const projectSlug = cookieStore.get('projectSlug')
    const token = cookieStore.get('token')

    if (projectSlug && token) {
        const buildsResponse = await listBuilds(token?.value as string, projectSlug?.value as string,{
            page: {
              limit: 50,
            },
            filter: {
                state: State.Finished
            }
        });

        const successfulAndApprovedBuild = buildsResponse.data.find(build => {
            return build.attributes["review-state"] === 'approved'
        })

        let snapshotsResponse;

        if (successfulAndApprovedBuild) {
            snapshotsResponse = await listSnapshots(token?.value as string, successfulAndApprovedBuild.id);
        } else {
            snapshotsResponse = await listSnapshots(token?.value as string, buildsResponse.data[0].id);
        }

        const mappedSnapshots = snapshotsResponse.data.map(snapshot => {
            return snapshot.attributes.name
        });

        return {
            snapshots: mappedSnapshots
        }
    }

    return null
}
