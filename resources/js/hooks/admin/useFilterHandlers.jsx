import { useCallback, useEffect, useRef } from 'react';
import { useForm } from '@inertiajs/react';

export const useFilterHandlers = (rotta, sortBy, sortDirection, currentPerPage, setCurrentPerPage, searchQuery, setSearchQuery, setLoading) => {
    const { get } = useForm();
    const previousQuery = useRef('');

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Effettua la ricerca o mostra tutti i dati se `searchQuery` è vuoto
    useEffect(() => {
        // Controlla se la query è cambiata rispetto al valore precedente
        if (searchQuery === previousQuery.current) return;

        // Mostra tutti i risultati se `searchQuery` è vuoto
        const timer = setTimeout(() => {
            setLoading(true);
            previousQuery.current = searchQuery; // Aggiorna il valore precedente

            const queryParams = searchQuery
                ? { q: searchQuery, sortBy, sortDirection, perPage: currentPerPage }
                : { sortBy, sortDirection, perPage: currentPerPage }; // Parametri senza ricerca

            // Effettua la richiesta con i parametri corretti
            get(route(rotta, queryParams), {
                preserveState: true,
                preserveScroll: true,
                onFinish: () => setLoading(false),
            });
        }, 500);

        return () => clearTimeout(timer); // Cancella il timer precedente

    }, [searchQuery, get, currentPerPage, sortBy, sortDirection, rotta]);

    const handlePerPageChange = useCallback((e) => {
        const selectedPerPage = e.target.value;
        setCurrentPerPage(selectedPerPage);
        setLoading(true);
        get(route(rotta, { sortBy, sortDirection, perPage: selectedPerPage, q: searchQuery }), {
            preserveState: true,
            preserveScroll: true,
            onFinish: () => setLoading(false),
        });
    }, [get, currentPerPage, sortBy, sortDirection, searchQuery, rotta]);

    const handleSort = useCallback((column) => {
        const direction = (sortBy === column && sortDirection === 'asc') ? 'desc' : 'asc';
        setLoading(true);
        get(route(rotta, { sortBy: column, sortDirection: direction, perPage: currentPerPage, q: searchQuery }), {
            preserveState: true,
            preserveScroll: true,
            onFinish: () => setLoading(false),
        });
    }, [get, sortBy, sortDirection, currentPerPage, searchQuery, rotta]);

    const getSortIcon = (column) => {
        if (sortBy === column) {
            return sortDirection === 'asc' ? <i className="fa-solid fa-caret-up"></i> : <i className="fa-solid fa-caret-down"></i>;
        }
        return null;
    };

    return {
        handleSearchChange,
        handlePerPageChange,
        handleSort,
        getSortIcon,
    };
};
