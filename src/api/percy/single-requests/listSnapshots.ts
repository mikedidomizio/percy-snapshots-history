import {PercyListSnapshots} from "@/types/percy/listSnapshots";
import {cookies} from "next/headers";

// https://percy.io/api/v1/snapshots/1569601638?include=comparisons.head-screenshot.image%2Ccomparisons.base-screenshot.image%2Ccomparisons.diff-image%2Ccomparisons.base-snapshot%2Ccomparisons.base-snapshot.build%2Ccomparisons.browser%2Ccomparisons.comparison-tag%2Cignored-regions.browserFamily%2Cignored-regions.project%2Cignored-regions.creator%2Cignored-regions.first-build%2Cignored-regions.comparison-tag

export const listSnapshots = async (
  token: string,
  buildId: string,
): Promise<PercyListSnapshots> => {
  const response = await fetch(
    `https://percy.io/api/v1/snapshots?build_id=${buildId}`,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    },
  )
  return response.json() as Promise<PercyListSnapshots>
}
