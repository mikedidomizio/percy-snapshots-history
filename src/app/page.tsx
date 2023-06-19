import {PercySnapshotsList} from "@/components/PercySnapshotsList";
import {listSnapshotsOfBuild} from "@/api/percy/listSnapshotsOfBuild";

export default async function Home() {
    const [listSnapshotsResponse] = await Promise.all([listSnapshotsOfBuild()]);

    return (
    <main className="min-h-screen p-6">
        <PercySnapshotsList snapshotsProp={listSnapshotsResponse?.snapshots} />
    </main>
  )
}
