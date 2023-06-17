import {cookies} from "next/headers";
import {listBuilds} from "@/api/percy/single-requests/listBuilds";
import {listSnapshots} from "@/api/percy/single-requests/listSnapshots";

export const listSnapshotsOfBuild = async() => {
    const cookieStore = cookies()
    const projectSlug = cookieStore.get('projectSlug')
    const token = cookieStore.get('token')

    if (projectSlug && token) {
        const buildsResponse = await listBuilds(token?.value as string, projectSlug?.value as string, undefined, 1);
        const snapshotsResponse = await listSnapshots(token?.value as string, buildsResponse.data[0].id);

        const mappedSnapshots = snapshotsResponse.data.map(snapshot => {
            return snapshot.attributes.name
        });

        return {
            snapshots: mappedSnapshots
        }
    }

    return null
}
