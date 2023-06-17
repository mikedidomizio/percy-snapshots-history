'use client'
import {useState} from "react";
import {setOrganizationId} from "@/stores/organization.store";
import Link from "next/link";

export const Header = () => {
    const handleFetchOrganization = async() => {
        const response = await fetch('./api/get-organization')
        const json = await response.json()
        setOrganizationId(json.organizationId)
    }

    const [token, setToken] = useState('')
    const [projectSlug, setProjectSlug] = useState('')

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
                   id="username" type="text" placeholder="Token" value={token} onChange={(e) => setToken(e.target.value)} />


            <button type="submit">Submit</button>
        </div>
    </form>
}
