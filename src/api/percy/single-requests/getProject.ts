import {Organization} from "@/types/percy/organization";

export const getProject = async(orgString: string, token?: string): Promise<Organization> => {
    let options = {}
    if (token) {
        options = {
            headers: {
                Authorization: `Token ${token}`,
            }
        }
    }

    const response = await fetch(
        `https://percy.io/api/v1/projects/${orgString}`,
            options,
    )
    return response.json()
}
