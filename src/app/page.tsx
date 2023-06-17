import {PercySnapshotsList} from "@/components/PercySnapshotsList";
import {listSnapshotsOfBuild} from "@/api/percy/listSnapshotsOfBuild";

export default async function Home() {
    const [percyData] = await Promise.all([listSnapshotsOfBuild()]);

    return (
    <main className="min-h-screen p-24">
        <PercySnapshotsList percyData={percyData} />
    </main>
  )
}
