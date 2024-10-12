import { createSlice } from '@reduxjs/toolkit';

const respCollapsedSlice = createSlice({
    name: 'respCollapsed',
    initialState: {
        respCollapsed: false,
    },
    reducers: {
        setRespCollapsed: (state, action) => {
            state.respCollapsed = action.payload;
        },
    },
});

export const { setRespCollapsed } = respCollapsedSlice.actions;

export default respCollapsedSlice.reducer;
