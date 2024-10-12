import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    product: {
        name: '',
        description: '',
        price: '',
        stock: '' || 0,
        image_path: null,
        categories: [],
        gallery: [],
    },
    errors: [],
    productImages: [],
    variantCombinations: [],
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProductInfo: (state, action) => {
            state.product = { ...state.product, ...action.payload };
        },
        resetProductInfo: (state) => {
            state.product = { ...initialState.product };
        },
        setInitialProductData: (state, action) => {
            state.product = action.payload;
        },
        setCategories: (state, action) => {
            state.product.categories = action.payload;
        },
        setThumb: (state, action) => {
            state.product.image_path = action.payload;
        },
        setGallery: (state, action) => {
            state.product.gallery = action.payload;
        },
        getErrors: (state, action) => {
            state.errors = action.payload;
        },
        getProductImages: (state, action) => {
            state.productImages = action.payload;
        },
        setVariantCombinations: (state, action) => {
            state.variantCombinations = action.payload;
        },
    },
});

export const { setProductInfo, setCategories, setThumb, setGallery, getErrors, resetProductInfo, setInitialProductData, getProductImages, setVariantCombinations } = productSlice.actions;

export default productSlice.reducer;