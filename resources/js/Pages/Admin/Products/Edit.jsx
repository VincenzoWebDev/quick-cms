import { Link, useForm } from '@inertiajs/react';
import Layout from '@/Layouts/Admin/Layout';
import { BASE_URL } from '@/constants/constants';
import { ImagesTab, InfoTab, InputErrors, ProductTabs, SeoTab, VariantsTab } from "@/components/Admin/Index";

const ProductEdit = ({ product, categories, selectedFatherCat, selectedChildCat, variants }) => {
    const combinedCategories = [...new Set([...selectedFatherCat, ...selectedChildCat])]; // Combina array delle categorie padre e figlio
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PATCH',
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        categories: combinedCategories,
        image_path: null,
        gallery: [],
        variantCombinations: [],
        seo_metadata: {
            meta_title: product.seo_metadata ? product.seo_metadata.meta_title : '',
            meta_description: product.seo_metadata ? product.seo_metadata.meta_description : '',
            meta_keywords: product.seo_metadata ? product.seo_metadata.meta_keywords : '',
            canonical_url: product.seo_metadata ? product.seo_metadata.canonical_url : '',
            og_title: product.seo_metadata ? product.seo_metadata.og_title : '',
            og_description: product.seo_metadata ? product.seo_metadata.og_description : '',
            og_image: product.seo_metadata ? product.seo_metadata.og_image : '',
            twitter_title: product.seo_metadata ? product.seo_metadata.twitter_title : '',
            twitter_description: product.seo_metadata ? product.seo_metadata.twitter_description : '',
            twitter_image: product.seo_metadata ? product.seo_metadata.twitter_image : '',
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };
    const handleSeoChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            seo_metadata: {
                ...data.seo_metadata,
                [name]: value,
            },
        });
    }

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
        post(route('products.update', product.id));
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
                                <InfoTab data={data} handleChange={handleChange} categories={categories} selectedFatherCat={selectedFatherCat} selectedChildCat={selectedChildCat} handleCatsChange={handleCatsChange} />
                                <ImagesTab ThumbChanged={handleThumbChange} GalleryChanged={handleGalleryChange} productImages={product.product_images} />
                                <VariantsTab variants={variants} setVariantCombinations={setVariantCombinations} combinationValues={product.combinations} />
                                <SeoTab data={data.seo_metadata} handleSeoChange={handleSeoChange} />
                            </div>
                            <div className="mb-3">
                                <button type="submit" className="btn cb-primary me-3" disabled={processing}>{processing ? 'In corso...' : 'Modifica'}</button>
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