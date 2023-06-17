import { Snapshot } from '../types/percy/listSnapshots'

export const getApprovedSnapshotsDiff = (snapshots: Snapshot[]): Snapshot[] => {
  return snapshots.filter((snapshot) => {
    return snapshot.attributes['review-state-reason'] === 'user_approved'
  })
}
