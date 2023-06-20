import {Header} from "@/components/Header";
import {cookies} from "next/headers";
import {ReactNode} from "react";

export default async function LayoutContent({
    children, // will be a page or nested layout
}: {
    children: ReactNode
}) {
    return (
        <section>
            <Header/>
            {children}
        </section>
    )
}
