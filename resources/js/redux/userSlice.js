import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        q: '',
        sortBy: '',
    },
    reducers: {
        searchUser: (state, action) => {
            state.q = action.payload;
        },
        setSortBy: (state, action) => {
            state.sortBy = action.payload;
        }
    }
})

export const { searchUser, setSortBy } = userSlice.actions;

export default userSlice.reducer;

