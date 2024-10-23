import { configureStore } from '@reduxjs/toolkit'
import darkThemeReducer from './darkThemeSlice'
import collapsedReducer from './collapsedSlice'
import respCollapsedReducer from './respCollapsedSlice'

export default configureStore({
    reducer: {
        darkTheme: darkThemeReducer,
        collapsed: collapsedReducer,
        respCollapsed: respCollapsedReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoreActions: ["product/setThumb", "product/setGallery"],
            ignoredPaths: ["product.product.image_path", "product.product.gallery"],
        }
    }),
})