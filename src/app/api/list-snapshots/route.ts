import {NextRequest, NextResponse} from "next/server";
import {listSnapshotsOfBuild} from "@/api/percy/listSnapshotsOfBuild";

export async function GET(req: NextRequest, res: NextResponse) {
    const snapshots = await listSnapshotsOfBuild()
    return NextResponse.json(snapshots)
}
