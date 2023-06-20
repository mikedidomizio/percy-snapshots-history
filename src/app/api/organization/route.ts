import {NextRequest, NextResponse} from "next/server";
import {getProject} from "@/api/percy/single-requests/getProject";
import {cookies} from "next/headers";


export async function POST(req: NextRequest, res: NextResponse) {
    const formData = await req.formData()
    const projectSlug = formData.get('projectSlug')
    const token = formData.get('token')

    if (projectSlug) {
        const organization = await getProject(projectSlug as string, token as string);
        cookies().set('organizationId', organization.data.relationships.organization.data.id)
        cookies().set('projectSlug', projectSlug as string)
        cookies().set('token', token as string)

        return NextResponse.json({
            organizationId: organization.data.relationships.organization.data.id,
        })
    } else {
        // todo proper throw
        throw new Error('missing formData')
    }
}
