'use client'
import {useState} from "react";
import {setOrganizationId} from "@/stores/organization.store";
import {redirect} from "next/navigation";

type SettingsProps = {
    projectSlug: string | undefined,
    token: string | undefined
}

export const SettingsForm = ({ token: tk, projectSlug: ps}: SettingsProps) => {
    const [token, setToken] = useState(tk)
    const [projectSlug, setProjectSlug] = useState(ps)

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
            redirect('/')
        }
    }


    return <form action={handleFetchOrganization}>
        <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="username">
                Project Slug (this is the full name including organization ex. 765234/project-name)
            </label>
            <input className="mb-2 input input-bordered input-primary w-full max-w-xs"
                   id="username" type="text" placeholder="Project Slug" value={projectSlug} onChange={(e) => setProjectSlug(e.target.value)} />

            <label className="block text-sm font-bold mb-2" htmlFor="username">
                Percy Token (found in project settings)
            </label>
            <input className="mb-2 input input-bordered input-primary w-full max-w-xs"
                   id="username" type="password" placeholder="Token" value={token} onChange={(e) => setToken(e.target.value)} />
            <br/>
            <button className="btn btn-primary" type="submit">Submit</button>
        </div>
    </form>
}
