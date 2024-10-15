import { Link, useForm, router } from '@inertiajs/react';
import Layout from '@/Layouts/Admin/Layout';
import { ImagesTab, InputErrors, ProductTabs, VariantsTab, SeoTab, InfoTab } from "@/components/Admin";
import { useDispatch, useSelector } from 'react-redux';
import { setProductInfo, setCategories, setThumb, getErrors, resetProductInfo, setGallery, getProductImages } from '@/redux/productSlice';
import { useEffect } from 'react';

const ProductCreate = ({ categories, selectedCategories, variants, variantColors, variantSizes }) => {
    const dispatch = useDispatch();
    const product = useSelector((state) => state.product.product);
    const errors = useSelector((state) => state.product.errors);
    const variantCombinations = useSelector((state) => state.product.variantCombinations);

    useEffect(() => {
        dispatch(resetProductInfo());
        dispatch(setCategories([]));
        dispatch(getProductImages([]));
        dispatch(getErrors([]));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(setProductInfo({ [name]: value }));
    };

    const handleCatsChange = (cats) => {
        dispatch(setCategories(cats));
    }

    const handleThumbChange = (file) => {
        if (file) {
            dispatch(setThumb(file));
        } else {
            dispatch(setThumb(null));
        }
    };

    const handleGalleryChange = (files) => {
        if (Array.from(files).length === 1) {
            dispatch(setGallery(files));
        } else if (Array.from(files).length > 1) {
            dispatch(setGallery(files));
        } else {
            dispatch(setGallery(null));
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route('products.store'), { ...product, variantCombinations }, {
            onSuccess: () => {
                dispatch(resetProductInfo());
                dispatch(setCategories([]));
                dispatch(getErrors([]));
            },
            onError: (errors) => {
                dispatch(getErrors(errors));
            }
        });
    };

    return (
        <Layout>
            <h2>Inserisci nuovo prodotto</h2>
            <InputErrors errors={errors} />

            <ProductTabs />
            <div className="row">
                <div className="col-md-8">
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="tab-content" id="myTabContent">
                            <InfoTab data={product} handleChange={handleChange} categories={categories} selectedCategories={selectedCategories} handleCatsChange={handleCatsChange} />
                            <ImagesTab ThumbChanged={handleThumbChange} GalleryChanged={handleGalleryChange} />
                            <VariantsTab variants={variants} variantColors={variantColors} variantSizes={variantSizes} />
                            <SeoTab />
                        </div>

                        <div className="mb-3">
                            <button className="btn cb-primary me-3">Inserisci</button>
                            <Link href={route('products.index')} className="btn btn-secondary">Torna indietro</Link>
                        </div>
                    </form>
                </div>
                <div className="col-md-4"></div>
            </div>
        </Layout>
    )
}

export default ProductCreate