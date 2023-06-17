export const getSnapshot = async (snapshotId: string) => {
  const response = await fetch(
    `https://percy.io/api/v1/snapshots/${snapshotId}`,
    {
      headers: {
        Authorization: `Token ${process.env.PERCY_TOKEN}`,
      },
    },
  )
  return response.json()
}
