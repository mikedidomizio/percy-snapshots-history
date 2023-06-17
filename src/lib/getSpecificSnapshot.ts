import { Snapshot } from '../types/percy/listSnapshots'

export const getSpecificSnapshot = (
  snapshots: Snapshot[],
  snapshotName: string,
): Snapshot | undefined => {
  return snapshots.find((snapshot) => snapshot.attributes.name === snapshotName)
}
