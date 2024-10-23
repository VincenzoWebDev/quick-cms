import { Link, router, useForm, usePage } from '@inertiajs/react';
import Layout from '@/Layouts/Admin/Layout';
import { BASE_URL } from '@/constants/constants';
import { ImagesTab, InfoTab, InputErrors, ProductTabs, SeoTab, VariantsTab } from "@/components/Admin/Index";
import { useEffect, useState } from 'react';

const ProductEdit = ({ product, categories, selectedCategories, productImages, variants, variantCombinationsGroup }) => {
    const { data, setData } = useForm({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        categories: selectedCategories,
        image_path: null,
        gallery: [],
        variantCombinations: [],
    });
    const { errors } = usePage().props;
    useEffect(() => {
        if (variantCombinationsGroup != '') {
            // Calcola e aggiorna lo stock globale quando cambiano le combinazioni
            const totalStock = variantCombinationsGroup.reduce((total, combination) => total + combination.quantity, 0);
            setData('stock', totalStock); // Aggiorna lo stato dello stock globale
        }
    }, [variantCombinationsGroup]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleCatsChange = (cats) => {
        setData('categories', cats);
    }

    const handleThumbChange = (file) => {
        if (file) {
            setData('image_path', file);
        } else {
            setData('image_path', null);
        }
    }

    const handleGalleryChange = (files) => {
        if (Array.from(files).length === 1) {
            setData('gallery', files);
        } else if (Array.from(files).length > 1) {
            setData('gallery', files);
        } else {
            setData('gallery', []);
        }
    }

    const setVariantCombinations = (combinations) => {
        setData('variantCombinations', combinations);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route('products.update', product.id), {
            ...data,
            _method: 'patch',
            forceFormData: true,
            onSuccess: () => {
                reset();
            }
        });
    };
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
                                <InfoTab data={data} handleChange={handleChange} categories={categories} selectedCategories={selectedCategories} handleCatsChange={handleCatsChange} />
                                <ImagesTab ThumbChanged={handleThumbChange} GalleryChanged={handleGalleryChange} productImages={productImages} />
                                <VariantsTab variants={variants} setVariantCombinations={setVariantCombinations} variantCombinationsGroup={variantCombinationsGroup} />
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