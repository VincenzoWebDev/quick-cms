import { InputErrors } from "@/components/Front/Index";
import { useForm, usePage } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetailCard = React.memo(({ product, variantNames }) => {
    const { user_auth } = usePage().props;
    const [selectedVariants, setSelectedVariants] = useState({});
    const [availableQuantity, setAvailableQuantity] = useState(null); // Imposta null per nascondere inizialmente
    const { post, data, setData, errors } = useForm({
        product_id: product.id,
        price: product.price,
        quantity: 1,
        max_quantity: '',
        combination_id: '',
    });

    // Effettua il controllo ogni volta che le varianti selezionate cambiano
    useEffect(() => {
        // Controlla se tutte le varianti necessarie sono state selezionate
        // const allVariantsSelected = Object.keys(selectedVariants).length === product.combinations.length;
        const variantCount = new Set(
            product.combinations
                .flatMap(combination =>
                    combination.variant_combination_values.map(v => v.product_variant_value?.product_variant_id)
                )
        ).size;
        // Verifica se tutte le varianti sono selezionate
        const allVariantsSelected = Object.keys(selectedVariants).length === variantCount;

        if (allVariantsSelected) {
            // Trova la combinazione corrispondente in base alle selezioni
            const combination = product.combinations?.find((comb) => {
                return Object.entries(selectedVariants).every(([variantId, value]) => {
                    return comb.variant_combination_values.some(v =>
                        v.product_variant_value?.product_variant_id === parseInt(variantId) &&
                        v.product_variant_value?.value === value
                    );
                });
            });
            // Se la combinazione esiste, aggiorna la quantità disponibile e il combination_id
            if (combination) {
                setData({
                    ...data,
                    combination_id: combination.id, // Imposta il combination_id
                    max_quantity: combination.quantity, // Imposta la quantità massima
                });
                setAvailableQuantity(combination.quantity); // Mostra la quantità disponibile
            } else {
                setAvailableQuantity(0); // Nessuna combinazione trovata, quindi quantità a zero
            }
        } else {
            setAvailableQuantity(null); // Non tutte le varianti sono state selezionate
        }
    }, [selectedVariants, product.combinations]);

    // Gestione del cambiamento della selezione delle varianti
    const handleVariantChange = (variantId, value) => {
        setSelectedVariants((prevSelectedVariants) => {
            const isSelected = prevSelectedVariants[variantId] === value;
            // Se la variante è selezionata, la rimuove; altrimenti, la imposta come selezionata
            return {
                ...prevSelectedVariants,
                [variantId]: isSelected ? null : value,
            };
        });
    };
    // Gestione dell'aggiunta al carrello
    const handleAddCard = () => {
        if (user_auth) {
            post(route('cart.add'), {
                onSuccess: (res) => {
                    if (res.props.flash.message) {
                        toast.error(res.props.flash.message.testo);
                    } else {
                        setData({
                            ...data,
                            quantity: 1,
                        });
                        toast.success('Prodotto aggiunto al carrello');
                        setAvailableQuantity(null); // Resetta la quantità disponibile
                    }
                },
            });
        } else {
            toast.warning('Devi essere loggato per aggiungere un prodotto al carrello');
        }
    };

    return (
        <div className="col-md-6 p-4 card">
            <InputErrors errors={errors} />
            <ToastContainer position="top-center" style={{ marginTop: '80px' }} />
            <div className="mb-3">
                <div className="d-flex align-items-center mb-2">
                    {[...Array(4)].map((_, i) => (
                        <i key={i} className="fa-solid fa-star" style={{ color: 'gold' }}></i>
                    ))}
                    <i className="fa-regular fa-star"></i>
                    <span className="text-muted">(50 Recensioni)</span>
                </div>
                <h1 className="h2 mb-2">{product.name}</h1>
                <div className="fs-4">
                    <span className="text-primary fw-bold me-2">€{product.price}</span>
                    {/* <span className="text-muted text-decoration-line-through me-2">$280.99</span>
                        <span className="badge bg-success">50% OFF</span> */}
                </div>
            </div>
            <div className="mb-3">
                <p className="text-success mb-1">
                    <i className="bi bi-check-circle-fill me-2"></i>In stock
                </p>
                <p className="text-success mb-3">
                    <i className="bi bi-check-circle-fill me-2"></i>Spedizione gratuita
                </p>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Offerte disponibili:</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <span className="badge bg-primary me-2">Bank Offer</span>
                                10% di sconto immediato sulle carte di debito della Federal Bank, fino a €3000 per ordini di €5,000 e oltre
                            </li>
                            <li>
                                <span className="badge bg-primary me-2">Special Price</span>
                                Ottieni un ulteriore 10% di sconto (prezzo comprensivo di sconto)
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                <button className="btn btn-success" type="button" onClick={handleAddCard} disabled={availableQuantity === null || availableQuantity === 0}>Aggiungi al carrello</button>
                {/* <button className="btn btn-outline-primary" type="button" onClick={handleAddCard} disabled={availableQuantity === null || availableQuantity === 0}>Compra ora</button> */}
            </div>
            <div className="mt-3">
                <label className="form-label fw-bold">Seleziona variante</label>
                <div className="row">
                    {product.combinations?.length > 0 &&
                        // Riduci tutte le varianti dalle combinazioni
                        Object.entries(
                            product.combinations.reduce((variantOptions, combination) => {
                                combination.variant_combination_values.forEach(v => {
                                    const variantId = v.product_variant_value?.product_variant_id;
                                    const variantValue = v.product_variant_value?.value;

                                    if (variantId) {
                                        if (!variantOptions[variantId]) {
                                            variantOptions[variantId] = new Set();
                                        }
                                        variantOptions[variantId].add(variantValue);
                                    }
                                });
                                return variantOptions;
                            }, {})
                        ).map(([variantId, values]) => (
                            <div className="mb-2 col-md-4 border-end" key={variantId}>
                                <h6>{variantNames[variantId] || 'Variante'}</h6>
                                {[...values].map(value => (
                                    <input key={value} type="button" className={`btn btn-outline-secondary me-2 mb-2 ${selectedVariants[variantId] === value ? 'active' : ''}`} autoComplete="off" value={value}
                                        onClick={(e) => handleVariantChange(variantId, e.target.value)} />
                                ))}
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="mt-3">
                {/* Quantità disponibile e input per selezione */}
                {availableQuantity > 0 ? (
                    <div className="quantity-selector">
                        <label htmlFor="quantity">Quantità Disponibile: {availableQuantity}</label>
                        <input
                            className="form-control w-25"
                            type="number"
                            id="quantity"
                            min="1"
                            max={availableQuantity}
                            value={data.quantity}
                            onChange={(e) => setData('quantity', e.target.value)}
                            onInput={(e) => {
                                const value = Math.max(1, Math.min(e.target.value, availableQuantity));
                                setData('quantity', value);
                            }}
                        />
                    </div>
                ) : availableQuantity === 0 ? (
                    <p>Combinazione non disponibile</p>
                ) : (
                    <p>Seleziona tutte le varianti per visualizzare la quantità disponibile</p>
                )}
            </div>
            <hr />
            <div className="">
                <p className="text-muted">
                    {product.description}
                </p>
            </div>
        </div>
    );
});

export default ProductDetailCard;
