import { PercyBuild } from '../types/percy/builds'

export const getApprovedBuilds = (builds: PercyBuild[]): PercyBuild[] => {
  return builds.filter((build) => {
    return (
      build.attributes['review-state'] === 'approved' &&
      build.attributes['review-state-reason'] !== 'no_diffs' &&
      build.attributes['review-state-reason'] !==
        'all_snapshots_approved_previously'
    )
  })
}
