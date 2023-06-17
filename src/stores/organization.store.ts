import {create} from "zustand";


type OrganizationStore = {
    organizationId: string | null,
    // setOrganizationId: (organizationId: string) => void
}

export const useOrganization = create<OrganizationStore>((set) => ({
    organizationId: null,
}))

export const setOrganizationId = (organizationId: string) => {
    useOrganization.setState({
        organizationId,
    })
}
