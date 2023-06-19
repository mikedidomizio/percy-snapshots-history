import {PercyGetBuildsResponse, State} from "@/types/percy/builds";
import {buildQueryStringArrayFromObject} from "@/api/percy/single-requests/getBuildItems";

type BuildOptions = {
    filter?: Record<string, string | number>
    page?: Record<string, string | number>,
}

export const listBuilds = async (
    token: string,
    project: string,
    options: BuildOptions
): Promise<PercyGetBuildsResponse> => {
    let url = `https://percy.io/api/v1/projects/${project}/builds`
    let qs = ''

    const pageQueryParams = buildQueryStringArrayFromObject(options.page ?? {}, 'page')
    const filterQueryParams = buildQueryStringArrayFromObject(options.filter ?? {}, 'filter')

    if (pageQueryParams) {
        qs += pageQueryParams
    }

    if (filterQueryParams) {
        qs += `&${filterQueryParams}`
    }

    const buildsResponse = await fetch(`${url}?${qs}`, {
        headers: {
            'Authorization': `Token ${token}`
        }
    })

    return buildsResponse.json()
}
