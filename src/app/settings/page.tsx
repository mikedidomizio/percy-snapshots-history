import {SettingsForm} from "@/components/SettingsForm";
import {cookies} from "next/headers";

export default async function Page() {
    const cookieStore = cookies()
    const projectSlug = cookieStore.get('projectSlug')
    const token = cookieStore.get('token')

    return <main className="flex p-6">
        <SettingsForm token={token?.value} projectSlug={projectSlug?.value} />
    </main>
}
