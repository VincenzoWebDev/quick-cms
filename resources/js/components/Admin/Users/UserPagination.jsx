import { Link } from '@inertiajs/react';

const UserPagination = ({ links }) => {
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
                >
                    {previousLink.label.replace(/&laquo; Precedente/g, '<<')}
                </Link>
            }

            {/* Mostra i cinque link intermedi */}
            {trimmedLinks.slice(firstIndex, lastIndex + 1).map((link, index) => (
                <Link preserveScroll
                    key={index}
                    href={link.url || '#'}
                    className={`${link.active ? 'active' : ''} mx-1 block btn cb-primary`}
                >
                    {link.label}
                </Link>
            ))}

            {/* Mostra il link successivo */}
            {nextLink &&
                <Link preserveScroll
                    href={nextLink.url || '#'}
                    className={`mx-1 block btn cb-primary`}
                >
                    {nextLink.label.replace(/Successiva &raquo;/g, '>>')}
                </Link>
            }
        </div>
    );
};

export default UserPagination;