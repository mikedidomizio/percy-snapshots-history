'use client'
import {useState} from "react";
import {setOrganizationId} from "@/stores/organization.store";
import Link from "next/link";
import Image from "next/image";

const { homepage } = require('../../package.json');

type HeaderProps = {
    projectSlug: string | undefined,
    token: string | undefined
}

export const Header = ({ projectSlug: ps, token: tk}: HeaderProps) => {
    const [token, setToken] = useState(tk)
    const [projectSlug, setProjectSlug] = useState(ps)
    const [showForm, setShowForm] = useState(!token && !projectSlug)

    const handleFetchOrganization = async() => {
        if (token && projectSlug) {
            const data = new URLSearchParams();
            data.append('token', token);
            data.append('projectSlug', projectSlug);

            const response = await fetch('./api/organization', {
                method: 'POST',
                body: data
            })
            const json = await response.json()
            setOrganizationId(json.organizationId)
            setShowForm(false)
        }
    }

    return <>
            <div className="flex flex-row space-x-4 items-center mb-6">
                <h1>
                    <Link href="/">Percy Snapshots History</Link>
                </h1>
                <Link href={homepage} target="_blank">
                    <Image alt="link to github repo" src="/github-mark-white.svg" width={32} height={32} />
                </Link>

                {!showForm ? <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setShowForm(true)}>
                    Show settings form</button> : null}
            </div>

            {showForm ? <form action={handleFetchOrganization}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Project Slug
                        </label>
                        <input className="mb-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                               id="username" type="text" placeholder="Project Slug" value={projectSlug} onChange={(e) => setProjectSlug(e.target.value)} />

                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Token
                        </label>
                        <input className="mb-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                               id="username" type="password" placeholder="Token" value={token} onChange={(e) => setToken(e.target.value)} />

                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Submit</button>
                    </div>
                </form>
                :  null}
        </>
}
