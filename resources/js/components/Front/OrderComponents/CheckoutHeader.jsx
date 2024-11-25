import { usePage } from "@inertiajs/react";

const CheckoutHeader = () => {
    const { url } = usePage();
    return (
        <header>
            <div className="bg-success">
                <div className="container py-3">
                    <nav className="d-flex">
                        <h6 className="mb-0">
                            {url.endsWith('cart') ?
                                <a href="#" className="text-white"><u>Carrello</u></a>
                                :
                                <a href="#" className="text-white-50">Carrello</a>
                            }
                            <span className="text-white-50 mx-2"> &gt; </span>
                            {
                                url.endsWith('checkout') ?
                                    <a href="#" className="text-white"><u>Informazioni ordine</u></a>
                                    :
                                    <a href="#" className="text-white-50">Informazioni ordine</a>

                            }
                            <span className="text-white-50 mx-2"> &gt; </span>
                            {
                                url.includes('checkout/payment') ?
                                    <a href="#" className="text-white"><u>Pagamento</u></a>
                                    :
                                    <a href="#" className="text-white-50">Pagamento</a>
                            }
                        </h6>
                    </nav>
                </div>
            </div>
        </header>
    )
}
export default CheckoutHeader;
