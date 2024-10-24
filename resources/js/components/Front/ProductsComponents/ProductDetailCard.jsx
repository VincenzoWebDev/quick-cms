import { InputErrors } from "@/components/Front/Index";
import { useForm, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const ProductDetailCard = ({ product }) => {
    const { user_auth } = usePage().props;
    const MySwal = withReactContent(Swal);
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
        setSelectedVariants(prev => ({
            ...prev,
            [variantId]: value, // Aggiorna la variante selezionata
        }));
    };
    // Gestione dell'aggiunta al carrello
    const handleAddCard = () => {
        if (user_auth) {
            post(route('cart.add'), {
                onSuccess: (res) => {
                    if (res.props.flash.message) {
                        MySwal.fire({
                            title: 'Quantità massima raggiunta',
                            icon: 'error',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    } else {
                        setData({
                            ...data,
                            quantity: 1,
                        });
                        MySwal.fire({
                            title: 'Prodotto aggiunto al carrello',
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        setAvailableQuantity(null); // Resetta la quantità disponibile
                    }
                },
            });
        } else {
            MySwal.fire({
                title: 'Devi essere loggato per aggiungere un prodotto al carrello',
                icon: 'error',
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    return (
        <div className="col-md-6 card p-4">
            <InputErrors errors={errors} />
            <h4>{product.name}</h4>
            <p className="text-secondary">{product.description}</p>
            <h5>€{product.price}</h5>
            <p>In stock</p>
            <p>Spedizione gratuita</p>
            <div className="d-flex align-items-center">
                <button className="btn btn-success me-2" onClick={handleAddCard} disabled={availableQuantity === null || availableQuantity === 0}>
                    Aggiungi al carrello
                </button>
                {/* <button className="btn btn-primary">Compra ora</button> */}
            </div>
            <div className="row mt-3">
                <label className="form-label fw-bold">Seleziona variante</label>
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
                        <div className="col-md-4" key={variantId}>
                            <select
                                className="form-select"
                                onChange={(e) => handleVariantChange(variantId, e.target.value)}
                                value={selectedVariants[variantId] || ""}
                            >
                                <option value="">Seleziona</option>
                                {[...values].map(value => (
                                    <option key={value} value={value}>{value}</option>
                                ))}
                            </select>
                        </div>
                    ))
                }
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
        </div>
    );
};

export default ProductDetailCard;
