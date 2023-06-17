import {PercyGetBuildsResponse} from "@/types/percy/builds";

export const listBuilds = async (
    token: string,
    project: string,
    lastBuild?: string,
    limit?: number
): Promise<PercyGetBuildsResponse> => {
    let url = `https://percy.io/api/v1/projects/${project}/builds`

    if (lastBuild) {
        url += `?page[cursor]=${lastBuild}`
    }

    if (limit) {
        // todo only supporting cursor or limit
        url += `?page[limit]=${limit}`
    }

    const buildsResponse = await fetch(url, {
        headers: {
            'Authorization': `Token ${token}`
        }
    })

    return buildsResponse.json()
}
