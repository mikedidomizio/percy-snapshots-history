'use client'
import {useState} from "react";
import {setOrganizationId} from "@/stores/organization.store";
import {redirect} from "next/navigation";

type SettingsProps = {
    projectSlug: string | undefined,
    token: string | undefined
}

const examplePublicProjects = ['ampproject/amphtml', 'Ember/Ember-Website']

export const SettingsForm = ({ token: tk, projectSlug: ps}: SettingsProps) => {
    const [token, setToken] = useState(tk)
    const [projectSlug, setProjectSlug] = useState(ps)

    const handleFetchOrganization = async() => {
        if (projectSlug) {
            const data = new URLSearchParams();
            if (token) {
                data.append('token', token);
            }
            data.append('projectSlug', projectSlug);

            const response = await fetch('/api/organization', {
                method: 'POST',
                body: data
            })
            const json = await response.json()
            setOrganizationId(json.organizationId)
            redirect('/')
        }
    }

    const handleProjectSlugUpdated = (projectSlug: string) => {
        setProjectSlug(projectSlug)

        if (examplePublicProjects.includes(projectSlug)) {
            setToken('')
        }
    }

    const handleUsePublicProject = async () => {
        setProjectSlug('Ember/Ember-Website')
        setToken('')
    }

    return <form action={handleFetchOrganization}>
        <div>
            <label className="block text-sm font-bold mb-2" htmlFor="username">
                Project Slug (this is the full name including organization ex. &quot;ampproject/amphtml&quot; or &quot;Ember/Ember-Website&quot;)
            </label>
            <input className="mb-6 input input-bordered input-primary w-full max-w-xs"
                   id="username" required type="text" placeholder="Project Slug" value={projectSlug} onChange={(e) => handleProjectSlugUpdated(e.target.value)} />

            <label className="block text-sm font-bold mb-2" htmlFor="username">
                Percy Token (found in project settings, leave empty if public project)
            </label>
            <input className="mb-6 input input-bordered input-primary w-full max-w-xs"
                   id="username" type="password" placeholder="Token" value={token} onChange={(e) => setToken(e.target.value)} />
            <br/>

            <div className="space-x-6">
                <button className="btn btn-primary" type="submit">Submit</button>
                <button className="btn btn-primary" type="button" onClick={() => handleUsePublicProject()}>Use public project for testing</button>
            </div>
        </div>
    </form>
}
