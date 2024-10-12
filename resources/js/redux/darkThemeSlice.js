import { createSlice } from '@reduxjs/toolkit'

const darkThemeSlice = createSlice({
    name: 'darkTheme',
    initialState: {
        // darkTheme: false,
        darkTheme: localStorage.getItem('data-theme') === 'dark'
    },
    reducers: {
        setDarkTheme: (state, action) => {
            state.darkTheme = action.payload
        }
    }
})

export const { setDarkTheme } = darkThemeSlice.actions

export default darkThemeSlice.reducer