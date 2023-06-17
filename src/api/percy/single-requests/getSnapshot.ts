export const getSnapshot = async (token: string, snapshotId: string) => {
  const response = await fetch(
    `https://percy.io/api/v1/snapshots/${snapshotId}`,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    },
  )
  return response.json()
}
