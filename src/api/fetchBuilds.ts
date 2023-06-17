
export const fetchBuilds = async (
    project: string,
    lastBuild?: string
): Promise<any> => {
    let url = `https://percy.io/api/v1/projects/${project}/builds`

    if (lastBuild) {
        url += `?page[cursor]=${lastBuild}`
    }

    const buildsResponse = await fetch(url, {
        headers: {
            'Authorization': `Token ${process.env.PERCY_TOKEN}`
        }
    })

    return buildsResponse.json()
}
