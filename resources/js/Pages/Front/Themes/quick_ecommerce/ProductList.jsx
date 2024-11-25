import EcommerceLayout from "@/Layouts/EcommerceLayout";
import AlertErrors from "@/components/Front/AlertErrors"
import { PriceFilter, ProductCard } from "@/components/Themes/QuickEcommerce/Index";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import SearchAndPerPageSelector from "@/components/Themes/QuickEcommerce/SearchAndPerPageSelector";
import { useFilterHandlers } from "@/hooks/front/useFilterHandlers";
import { useForm, usePage } from "@inertiajs/react";
import { InputErrors } from "@/components/Front/Index";

const ProductList = ({ products, sortBy, sortDirection, perPage, sortSearch, minPrice, maxPrice, sortVariants, variants, flash }) => {
    const { errors } = usePage().props;
    const { get } = useForm({
        sortBy: 'id',
        sortDirection: 'desc',
        perPage: 10,
        q: '',
        minPrice: 0,
        maxPrice: 1000,
    });
    const [currentPerPage, setCurrentPerPage] = useState(perPage);
    const [searchQuery, setSearchQuery] = useState(sortSearch || '');
    const [loading, setLoading] = useState(false);
    const [priceRange, setPriceRange] = useState({ min: minPrice, max: maxPrice });
    const [selectedVariants, setSelectedVariants] = useState(sortVariants);

    const { handleSearchChange, handlePerPageChange, handleSort, handleDirection, handleApplyFilter, processing } = useFilterHandlers(
        'productList', // qui passi solo il nome della rotta senza route()
        sortBy,
        sortDirection,
        currentPerPage,
        setCurrentPerPage,
        searchQuery,
        setSearchQuery,
        setLoading,
        priceRange,
        selectedVariants,
    );

    const [message, setMessage] = useState(flash.message);
    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage(null);
        }, 3000);
        return () => clearTimeout(timer);
    }, [message]);

    useEffect(() => {
        AOS.init({
            duration: 500,
            easing: 'ease-in-out',
            once: true,
            mirror: true,
        });
    }, [])

    const [openVariant, setOpenVariant] = useState(null);
    const toggleCollapse = (variantId) => {
        setOpenVariant(openVariant === variantId ? null : variantId);
    };

    const handleResetFilters = () => {
        setLoading(true);

        // Resetta gli stati dei filtri        
        setCurrentPerPage(10);
        setSearchQuery('');
        setPriceRange({ min: 0, max: 1000 });
        setSelectedVariants({});

        // Effettua la richiesta per ripristinare i prodotti senza filtri
        get(route('productList'), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                setLoading(false);
            }
        });
    };

    const handleVariantChange = (variantId, value) => {
        setSelectedVariants(prevSelectedVariants => {
            const currentValues = prevSelectedVariants[variantId] || [];

            // Aggiunge o rimuove il valore dall'array
            const updatedValues = currentValues.includes(value)
                ? currentValues.filter(v => v !== value)  // Rimuove se già presente
                : [...currentValues, value];              // Aggiunge se non presente

            return {
                ...prevSelectedVariants,
                [variantId]: updatedValues
            };
        });
    };

    return (
        <EcommerceLayout>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <SearchAndPerPageSelector currentPerPage={currentPerPage} handlePerPageChange={handlePerPageChange} loading={loading} searchQuery={searchQuery} handleSearchChange={handleSearchChange} />
                    </div>
                </div>
                <div className="d-flex justify-content-center row">
                    <div className="col-md-3">
                        <div className="card mb-4">
                            <button className="btn btn-outline-primary p-1" onClick={() => handleResetFilters()} disabled={loading}>
                                {loading ? 'Caricamento...' : 'Reset filtri'}
                            </button>
                        </div>
                        <InputErrors errors={errors} />
                        {/* Color Filter */}
                        {variants.map((variant) => (
                            <div key={variant.id} className="mb-4">
                                {/* Titolo della variante come toggle per il collapse */}
                                <h6
                                    className="mb-2 d-flex w-100 justify-content-between"
                                    role="button"
                                    id={`collapseToggle${variant.id}`}
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#collapse${variant.id}`}
                                    aria-expanded={openVariant === variant.id}
                                    aria-controls={`collapse${variant.id}`}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => toggleCollapse(variant.id)}
                                >
                                    {variant.name} {openVariant === variant.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                </h6>

                                {/* Contenuto del collapse */}
                                <div
                                    id={`collapse${variant.id}`}
                                    className="collapse"
                                    aria-labelledby={`collapseToggle${variant.id}`}
                                >
                                    {variant.values.map((value) => (
                                        <div key={value.value} className="list-group">
                                            <label
                                                className="list-group-item-action"
                                                htmlFor={`variant-${value.value}`}
                                            >
                                                <input
                                                    className="form-check-input me-2"
                                                    type="checkbox"
                                                    id={`variant-${value.value}`}
                                                    checked={(selectedVariants[variant.id] || []).includes(value.value)}
                                                    onChange={() => handleVariantChange(variant.id, value.value)}
                                                />
                                                {value.value}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                        {/* Price Filter */}
                        <PriceFilter priceRange={priceRange} setPriceRange={setPriceRange} handleApplyFilter={handleApplyFilter} processing={processing} />

                        {/* button apply filter */}
                        <div className="card mb-4">
                            <button className="btn btn-outline-primary p-1" onClick={handleApplyFilter} disabled={processing}>{processing ? 'Caricamento...' : 'Applica Filtro'}</button>
                        </div>
                        <hr />
                        <div className="mb-4">
                            <div className="d-flex align-items-center mb-2">
                                <h6 className="mb-0">Ordina per:</h6>
                            </div>

                            <SortBy sortBy={sortBy} handleSort={handleSort} />

                            <div className="card mt-3">
                                <button
                                    className="btn btn-outline-primary p-1"
                                    onClick={handleDirection}
                                    disabled={processing}
                                >
                                    {processing ? 'Caricameto...' : sortDirection === "asc" ? "Ordine: Crescente" : "Ordine: Decrescente"}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9 products">
                        <AlertErrors message={message} />
                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                            {products.data.map((product, index) => (
                                <div key={product.id} data-aos="fade-up" data-aos-delay={index * 150}>
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </EcommerceLayout>
    )
}

const SortBy = ({ sortBy, handleSort }) => {
    return (
        <div className="list-group">
            <label htmlFor="name" className="list-group-item-action">
                <input
                    className="form-check-input me-2"
                    type="radio"
                    id="name"
                    value="name"
                    checked={sortBy === "name"}
                    onChange={() => handleSort("name")}
                />
                Nome
            </label>

            <label htmlFor="price" className="list-group-item-action">
                <input
                    className="form-check-input me-2"
                    type="radio"
                    id="price"
                    value="price"
                    checked={sortBy === "price"}
                    onChange={() => handleSort("price")}
                />
                Prezzo
            </label>

            <label htmlFor="created_at" className="list-group-item-action">
                <input
                    className="form-check-input me-2"
                    type="radio"
                    id="created_at"
                    value="created_at"
                    checked={sortBy === "created_at"}
                    onChange={() => handleSort("created_at")}
                />
                Data
            </label>
        </div>
    )
}

export default ProductList;