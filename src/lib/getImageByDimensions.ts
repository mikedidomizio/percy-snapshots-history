type PercySnapshot = {
  type: string
  id: string
  attributes: {
    url: string
    width: number
    height: number
  }
}

export const getImageByDimensions = (
  snapshots: PercySnapshot[],
  width = null,
  height = null,
) => {
  if (width && height) {
    // todo
  }

  return snapshots.find((snapshot) => snapshot.type === 'images')
}
