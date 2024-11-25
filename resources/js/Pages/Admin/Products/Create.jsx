import { Link, useForm } from '@inertiajs/react';
import Layout from '@/Layouts/Admin/Layout';
import { ImagesTab, InputErrors, ProductTabs, VariantsTab, SeoTab, InfoTab } from "@/components/Admin/Index";

const ProductCreate = ({ categories, variants }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
        price: '',
        stock: '' || 0,
        categories: [],
        image_path: null,
        gallery: [],
        variantCombinations: [],
        seo_metadata: {
            meta_title: '',
            meta_description: '',
            meta_keywords: '',
            canonical_url: '',
            og_title: '',
            og_description: '',
            og_image: '',
            twitter_title: '',
            twitter_description: '',
            twitter_image: '',
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
        post(route('products.store'), {
            onSuccess: () => {
                reset();
            },
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
                            <InfoTab data={data} handleChange={handleChange} categories={categories} handleCatsChange={handleCatsChange} />
                            <ImagesTab ThumbChanged={handleThumbChange} GalleryChanged={handleGalleryChange} />
                            <VariantsTab variants={variants} setVariantCombinations={setVariantCombinations} />
                            <SeoTab data={data.seo_metadata} handleSeoChange={handleSeoChange} />
                        </div>

                        <div className="mb-3">
                            <button className="btn cb-primary me-3" disabled={processing}>{processing ? "In corso..." : "Inserisci"}</button>
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