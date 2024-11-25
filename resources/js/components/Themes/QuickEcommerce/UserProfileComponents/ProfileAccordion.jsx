import { Link, usePage } from '@inertiajs/react';
import { ChevronRight, Settings, ShoppingBasket, User } from 'lucide-react';

const ProfileAccordion = () => {
    const { url } = usePage();
    const isActive = (routeName) => {
        // Estrae solo il percorso relativo dall’URL completo generato da `route()`
        const relativePath = new URL(route(routeName), window.location.origin).pathname;
        return url === relativePath;
    };

    return (
        <div className="accordion" id="accordionExample">
            <div className="card border-0" id="headingOne">
                <h2 className="card-header p-0 bg-primary">
                    <button className="d-flex px-3 py-2 align-items-center justify-content-between btn w-100 text-white border-0" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded={isActive('user.profile.index') ? "true" : "false"} aria-controls="collapseOne">
                        <div className='d-flex align-items-center'>
                            <div className='border rounded-circle p-1 me-2 d-flex align-items-center justify-content-center'>
                                <User size={18} />
                            </div>
                            <span>Account</span>
                        </div>
                    </button>
                </h2>
                <div id="collapseOne" className={`accordion-collapse collapse ${isActive('user.profile.index') ? "show" : ""}`} aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div className="card-body p-0 py-2">
                        <ul className='list-unstyled m-0'>
                            <li>
                                <Link preserveState href={route('user.profile.index')} className={`d-flex justify-content-between align-items-center px-3 py-2 ${isActive('user.profile.index') ? 'text-primary fw-bold' : ''}`} >
                                    <p>Profilo</p>
                                    <ChevronRight size={18} />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="card border-0" id="headingTwo">
                <h2 className="card-header p-0 bg-primary">
                    <button className="d-flex px-3 py-2 align-items-center justify-content-between btn w-100 text-white border-0" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded={isActive('user.profile.orders') || isActive('user.profile.completedOrders') ? "true" : "false"} aria-controls="collapseOne">
                        <div className='d-flex align-items-center'>
                            <div className='border rounded-circle p-1 me-2 d-flex align-items-center justify-content-center'>
                                <ShoppingBasket size={18} />
                            </div>
                            <span>Ordini</span>
                        </div>
                    </button>
                </h2>
                <div id="collapseTwo" className={`accordion-collapse collapse ${isActive('user.profile.orders') || isActive('user.profile.completedOrders') ? "show" : ""}`} aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                    <div className="card-body p-0 py-2">
                        <ul className='list-unstyled m-0'>
                            <li>
                                <Link preserveState href={route('user.profile.orders')} className={`d-flex justify-content-between align-items-center px-3 py-2 ${isActive('user.profile.orders') ? 'text-primary fw-bold' : ''}`}>
                                    <p>Ordini effettuati</p>
                                    <ChevronRight size={18} />
                                </Link>
                            </li>
                            <li>
                                <Link preserveState href={route('user.profile.completedOrders')} className={`d-flex justify-content-between align-items-center px-3 py-2 ${isActive('user.profile.completedOrders') ? 'text-primary fw-bold' : ''}`}>
                                    <p>Cronologia acquisti</p>
                                    <ChevronRight size={18} />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* <div className="card border-0" id="headingThree">
                <h2 className="card-header p-0 bg-primary">
                    <button className="d-flex px-3 py-2 align-items-center justify-content-between btn w-100 text-white border-0" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseOne">
                        <div className='d-flex align-items-center'>
                            <div className='border rounded-circle p-1 me-2 d-flex align-items-center justify-content-center'>
                                <Settings size={18} />
                            </div>
                            <span>Impostazioni</span>
                        </div>
                    </button>
                </h2>
                <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                    <div className="card-body p-0 py-2">
                        <ul className='list-unstyled m-0'>
                            <li>
                                <a href="#" className="d-flex justify-content-between align-items-center px-3 py-2">
                                    <p>Dropbox</p>
                                    <ChevronRight size={18} />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default ProfileAccordion