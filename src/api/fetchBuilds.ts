
export const fetchBuilds = async (
    project: string,
): Promise<any> => {
    const buildsResponse = await fetch(`https://percy.io/api/v1/projects/${project}/builds`, {
        headers: {
            'Authorization': `Token ${process.env.PERCY_TOKEN}`
        }
    })

    return buildsResponse.json()
}
