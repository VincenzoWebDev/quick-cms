import { Link, useForm } from '@inertiajs/react';

const Pagination = ({ links, sortBy, sortDirection, perPage, q, rotta }) => {
    const { get } = useForm();

    const handlePageChange = (url, sortBy, sortDirection, perPage, q) => {
        const urlParams = new URLSearchParams(new URL(url).search);
        const page = urlParams.get('page') || 1;
        get(route(rotta, { page: page, sortBy, sortDirection, perPage, q }), {
            preserveScroll: true,
            preserveState: true,
        });
    };

    // Numero massimo di pagine da mostrare
    const maxPagesToShow = 5;

    // Rimuovi il primo e l'ultimo elemento dall'array links
    const trimmedLinks = links.slice(1, -1);

    // Trova l'indice del link attivo
    const activeIndex = trimmedLinks.findIndex(link => link.active);

    // Calcola l'indice del primo link
    const firstIndex = Math.max(0, activeIndex - Math.floor(maxPagesToShow / 2));

    // Calcola l'indice dell'ultimo link
    const lastIndex = Math.min(trimmedLinks.length - 1, firstIndex + maxPagesToShow - 1);

    // Estrai il link precedente e successivo
    const previousLink = links[0];
    const nextLink = links[links.length - 1];

    return (
        <div className='d-flex justify-content-center'>
            {/* Mostra il link precedente */}
            {previousLink &&
                <Link preserveScroll
                    href={previousLink.url || '#'}
                    className={`mx-1 block btn cb-primary`}
                    onClick={(e) => {
                        e.preventDefault();
                        if (previousLink.url) {
                            handlePageChange(previousLink.url, sortBy, sortDirection, perPage, q);
                        }
                    }}
                >
                    {previousLink.label.replace(/&laquo; Precedente/g, '<')}
                </Link>
            }

            {/* Mostra i cinque link intermedi */}
            {trimmedLinks.slice(firstIndex, lastIndex + 1).map((link, index) => (
                <Link preserveScroll
                    key={index}
                    href={link.url || '#'}
                    className={`${link.active ? 'active' : ''} mx-1 block btn cb-primary`}
                    onClick={(e) => {
                        e.preventDefault();
                        if (link.url) {
                            handlePageChange(link.url, sortBy, sortDirection, perPage, q);
                        }
                    }}
                >
                    {link.label}
                </Link>
            ))}

            {/* Mostra il link successivo */}
            {nextLink &&
                <Link preserveScroll
                    href={nextLink.url || '#'}
                    className={`mx-1 block btn cb-primary`}
                    onClick={(e) => {
                        e.preventDefault();
                        if (nextLink.url) {
                            handlePageChange(nextLink.url, sortBy, sortDirection, perPage, q);
                        }
                    }}
                >
                    {nextLink.label.replace(/Successiva &raquo;/g, '>')}
                </Link>
            }
        </div>
    );
};

export default Pagination;