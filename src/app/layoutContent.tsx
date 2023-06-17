import React from "react";
import {Header} from "@/components/Header";
import {cookies} from "next/headers";

export default async function LayoutContent({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    const cookieStore = cookies()
    const projectSlug = cookieStore.get('projectSlug')
    const token = cookieStore.get('token')

    return (
        <section>
            <Header projectSlug={projectSlug?.value as string} token={token?.value as string}/>
            {children}
        </section>
    )
}
