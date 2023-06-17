'use client'
import {useState} from "react";
import {setOrganizationId} from "@/stores/organization.store";
import Link from "next/link";

type HeaderProps = {
    projectSlug: string,
    token: string
}

export const Header = ({ projectSlug: ps, token: tk}: HeaderProps) => {
    const [token, setToken] = useState(tk)
    const [projectSlug, setProjectSlug] = useState(ps)

    const handleFetchOrganization = async() => {
        const data = new URLSearchParams();
        data.append('token', token);
        data.append('projectSlug', projectSlug);

        const response = await fetch('./api/organization', {
            method: 'POST',
            body: data
        })
        const json = await response.json()
        setOrganizationId(json.organizationId)
    }

    return <form action={handleFetchOrganization}>
        <h1><Link href="/">Percy Snapshot Compare</Link></h1>

        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Project Slug
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username" type="text" placeholder="Project Slug" value={projectSlug} onChange={(e) => setProjectSlug(e.target.value)} />

            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Token
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                   id="username" type="password" placeholder="Token" value={token} onChange={(e) => setToken(e.target.value)} />

            <button type="submit">Submit</button>
        </div>
    </form>
}
