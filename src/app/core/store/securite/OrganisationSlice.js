import { createSlice } from '@reduxjs/toolkit'

const OrganisationSlice = createSlice({
    name: 'organisation',
    initialState: {
        currentOrganisation: { id: 1 },
    },
    reducers: {
        setOrganisation(state, action) {
            state.currentOrganisation = action.payload.currentOrganisation
        },
    },
})

export const organisationSliceActions = OrganisationSlice.actions;
export default OrganisationSlice;
