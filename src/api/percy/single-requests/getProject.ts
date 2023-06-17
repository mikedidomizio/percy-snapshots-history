import {Organization} from "@/types/percy/organization";

export const getProject = async(orgString: string, token: string): Promise<Organization> => {
    console.log(orgString, token)
    const response = await fetch(
        `https://percy.io/api/v1/projects/${orgString}`,
        {
            headers: {
                Authorization: `Token ${token}`,
            },
        },
    )
    return response.json()
}
