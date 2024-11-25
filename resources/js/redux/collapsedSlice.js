import { createSlice } from '@reduxjs/toolkit'

const collapsedSlice = createSlice({
    name: 'collapsed',
    initialState: {
        // collapsed: false,
        collapsed: localStorage.getItem('collapsed') === 'true'
    },
    reducers: {
        setCollapsed: (state, action) => {
            state.collapsed = action.payload
        }
    }
})

export const { setCollapsed } = collapsedSlice.actions

export default collapsedSlice.reducer