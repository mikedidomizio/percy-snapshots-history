import {Organization} from "@/types/percy/organization";

export const getProject = async(orgString: string): Promise<Organization> => {
    const response = await fetch(
        `https://percy.io/api/v1/projects/${orgString}`,
        {
            headers: {
                Authorization: `Token ${process.env.PERCY_TOKEN}`,
            },
        },
    )
    return response.json()
}
