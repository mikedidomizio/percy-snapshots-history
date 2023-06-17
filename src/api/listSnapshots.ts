import {PercyListSnapshots} from "@/types/percy/listSnapshots";

export const listSnapshots = async (
  buildId: string,
): Promise<PercyListSnapshots> => {
  const response = await fetch(
    `https://percy.io/api/v1/snapshots?build_id=${buildId}`,
    {
      headers: {
        Authorization: `Token ${process.env.PERCY_TOKEN}`,
      },
    },
  )
  return response.json() as Promise<PercyListSnapshots>
}
