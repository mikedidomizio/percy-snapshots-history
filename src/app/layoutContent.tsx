import {Header} from "@/components/Header";
import {cookies} from "next/headers";
import {ReactNode} from "react";

export default async function LayoutContent({
    children, // will be a page or nested layout
}: {
    children: ReactNode
}) {
    const cookieStore = cookies()
    const projectSlug = cookieStore.get('projectSlug')
    const token = cookieStore.get('token')

    return (
        <section>
            <Header projectSlug={projectSlug?.value} token={token?.value}/>
            {children}
        </section>
    )
}
