import { Link, router, usePage } from '@inertiajs/react';
import Layout from '@/Layouts/Admin/Layout';
import { BASE_URL } from '@/constants/constants';
import { ImagesTab, InfoTab, InputErrors, ProductTabs, SeoTab, VariantsTab } from "@/components/Admin/Index";
import { useDispatch, useSelector } from 'react-redux';
import { getErrors, getProductImages, resetProductInfo, setCategories, setGallery, setInitialProductData, setProductInfo, setThumb } from '@/redux/productSlice';
import { useEffect } from 'react';


const ProductEdit = () => {
    const {product, categories, selectedCategories, productImages, variants, variantColors, variantSizes, variantCombinationsGroup } = usePage().props;
    const dispatch = useDispatch();
    const productData = useSelector(state => state.product.product);
    const errors = useSelector((state) => state.product.errors);
    const variantCombinations = useSelector((state) => state.product.variantCombinations);

    useEffect(() => {
        dispatch(getProductImages(productImages));
        dispatch(getErrors([]));
    }, []);

    useEffect(() => {
        dispatch(setInitialProductData(product));
        dispatch(setCategories(selectedCategories));
    }, [product]);

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
    }

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
        router.post(route('products.update', product.id), {
            ...productData,
            variantCombinations,
            _method: 'patch',
            forceFormData: true,
        }, {
            onSuccess: () => {
                dispatch(resetProductInfo());
                dispatch(setCategories([]));
                dispatch(getErrors([]));
            },
            onError: (errors) => {
                dispatch(getErrors(errors));
            }
        });
    }

    return (
        <>
            <Layout>
                <h2>Modifica prodotto</h2>
                <InputErrors errors={errors} />

                <ProductTabs />
                <div className='row'>
                    <div className="col-md-8">
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="tab-content" id="myTabContent">
                                <InfoTab data={productData} handleChange={handleChange} categories={categories} selectedCategories={selectedCategories} handleCatsChange={handleCatsChange} />
                                <ImagesTab ThumbChanged={handleThumbChange} GalleryChanged={handleGalleryChange} />
                                <VariantsTab variants={variants} variantColors={variantColors} variantSizes={variantSizes} variantCombinationsGroup={variantCombinationsGroup} />
                                <SeoTab />
                            </div>

                            <div className="mb-3">
                                <button type="submit" className="btn cb-primary me-3">Modifica</button>
                                <Link href={route('products.index')} className="btn btn-secondary">Torna indietro</Link>
                            </div>
                        </form >
                    </div>

                    {
                        product.image_path &&
                        <div className="col-md-4 text-center">
                            <p className="mb-3">Thumbnail</p>
                            <img src={`${BASE_URL}storage/${product.image_path}`} title={product.name} alt={product.name}
                                width="300" className="img-fluid" />
                        </div>
                    }
                </div>
            </Layout>
        </>
    )
}

export default ProductEdit