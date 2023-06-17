import {NextRequest, NextResponse} from "next/server";
import {getProject} from "@/api/getProject";
import {cookies} from "next/headers";


export async function GET(req: NextRequest, res: NextResponse) {
    const organization = await getProject(process.env.PERCY_PROJECT_SLUG || '');
    cookies().set('organizationId', organization.data.relationships.organization.data.id)

    return NextResponse.json({
        organizationId: organization.data.relationships.organization.data.id,
    })
}
