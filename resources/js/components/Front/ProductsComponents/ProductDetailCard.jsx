import { InputErrors } from "@/components/Front/Index";
import { useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const ProductDetailCard = ({ product, variantCombinationsGroup }) => {
    const { user_auth } = usePage().props;
    const MySwal = withReactContent(Swal);
    const [selectedColor, setSetelectedColor] = useState(null);
    const [selectedSize, setSetelectedSize] = useState(null);
    const [availableQuantity, setAvailableQuantity] = useState(0);
    const { post, data, setData, errors } = useForm({
        product_id: product.id,
        price: product.price,
        color: null,
        size: null,
        quantity: 1,
        combination_id: null,
    });

    const getColors = () => {
        let colors = [];
        variantCombinationsGroup.map((combination, index) => (
            colors[index] = combination.variant_value.split(',')[0]
        ));
        return colors = [...new Set(colors)];
    }

    const getSizes = () => {
        let sizes = [];
        variantCombinationsGroup.map((combination, index) => (
            sizes[index] = combination.variant_value.split(',')[1]
        ));
        return sizes = [...new Set(sizes)];
    }

    const handleCombinationChange = (size, color) => {
        setSetelectedColor(color);
        setSetelectedSize(size);

        const combination = variantCombinationsGroup.find((combination) => {
            return combination.variant_value.split(',')[0] === color && combination.variant_value.split(',')[1] === size
        })

        if (combination) {
            setData({
                ...data,
                color: color,
                size: size,
                max_quantity: combination.quantity,
                combination_id: combination.combination_id,
            });
            setAvailableQuantity(combination.quantity);
        } else {
            setAvailableQuantity(0);
        }
    }

    const handleAddCard = () => {
        if (user_auth) {
            post(route('cart.add'), {
                onSuccess: (res) => {
                    setData({
                        ...data,
                        color: null,
                        size: null,
                        quantity: 1,
                    });
                    if (res.props.flash.message != null) {
                        setSetelectedColor(null);
                        setSetelectedSize(null);
                        setAvailableQuantity(0);
                    } else {
                        MySwal.fire({
                            title: 'Prodotto aggiunto al carrelo',
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                    setSetelectedColor(null);
                    setSetelectedSize(null);
                    setAvailableQuantity(0);
                },
            });
        }
        else {
            MySwal.fire({
                title: 'Devi essere loggato per aggiungere un prodotto al carrelo',
                icon: 'error',
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    return (
        <div className="col-md-6 card p-4">
            <InputErrors errors={errors} />
            <h4>{product.name}</h4>
            <p className="text-secondary">{product.description}</p>
            <h5>€{product.price}</h5>
            <p>In stock</p>
            <p>Spedizione gratuita</p>
            <div className="d-flex align-items-center">
                <button className="btn btn-success me-2" onClick={handleAddCard}>Aggiungi al carrelo</button>
                <button className="btn btn-primary">Compra ora</button>
            </div>
            <div className="row mt-3">
                <div className="col-md-6">
                    <h5>Taglia:</h5>
                    <select className="form-select" aria-label="Default select example" onChange={(e) => handleCombinationChange(e.target.value, selectedColor)} value={selectedSize || ""}>
                        <option>Seleziona una taglia</option>
                        {getSizes().map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col-md-6">
                    <h5>Colore:</h5>
                    <select className="form-select" aria-label="Default select example" onChange={(e) => handleCombinationChange(selectedSize, e.target.value)} value={selectedColor || ""}>
                        <option>Seleziona un colore</option>
                        {getColors().map((color) => (
                            <option key={color} value={color}>
                                {color}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="mt-3">
                {/* Quantità disponibile e input per selezione */}
                {selectedSize && selectedColor && availableQuantity > 0 ? (
                    <div className="quantity-selector">
                        <label htmlFor="quantity">Quantità Disponibile: {availableQuantity}</label>
                        <input
                            className="form-control w-25"
                            type="number"
                            id="quantity"
                            min="1"
                            max={availableQuantity}
                            defaultValue="1"
                            onChange={(e) => setData('quantity', e.target.value)}
                            onInput={(e) => {
                                // Se il valore inserito è inferiore a 1, imposta 1
                                if (e.target.value < 1) {
                                    e.target.value = 1;
                                }
                                // Se il valore inserito è maggiore della quantità disponibile, imposta il massimo
                                if (e.target.value > availableQuantity) {
                                    e.target.value = availableQuantity;
                                }
                            }}
                        />
                    </div>
                ) : selectedSize && selectedColor && availableQuantity <= 0 ? (
                    <p>Prodotto esaurito per la combinazione selezionata.</p>
                ) : selectedSize && !selectedColor ? (
                    <p>Seleziona un colore per vedere la quantità disponibile.</p>
                ) : !selectedSize && selectedColor ? (
                    <p>Seleziona una taglia per vedere la quantità disponibile.</p>
                ) : (
                    <p>Seleziona una taglia e un colore per vedere la quantità disponibile.</p>
                )}
            </div>
        </div>
    )
}

export default ProductDetailCard