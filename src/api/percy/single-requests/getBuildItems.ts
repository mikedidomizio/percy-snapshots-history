import {BuildItemsResponse} from "@/types/percy/buildItems";

export function buildQueryStringArrayFromObject(obj = {}, arrayKey = '') {
    return Object.keys(obj).map(k => (Array.isArray((obj as any)[k])
            ? (obj as any)[k].map((v: any) => `${arrayKey}[${k}][]=${v}`).join('&')
            : `${arrayKey}[${k}]=${(obj as any)[k]}`
    )).join('&');
}

export const getBuildItems = async (token: string, filter = {}): Promise<BuildItemsResponse> => {
    const qs = buildQueryStringArrayFromObject(filter, 'filter')

    const response = await fetch(
        `https://percy.io/api/v1/build-items?${qs}`,
        {
            headers: {
                Authorization: `Token ${token}`,
            },
        },
    )
    return response.json()
}
