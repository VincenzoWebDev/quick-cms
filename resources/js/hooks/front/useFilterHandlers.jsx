import { useCallback, useEffect, useRef } from 'react';
import { useForm } from '@inertiajs/react';

export const useFilterHandlers = (rotta, sortBy, sortDirection, currentPerPage, setCurrentPerPage, searchQuery, setSearchQuery, setLoading, priceRange, selectedVariants) => {
    const { get, processing } = useForm();
    const previousQuery = useRef('');
    const dependencies = [get, currentPerPage, sortBy, sortDirection, searchQuery, priceRange, selectedVariants, rotta];

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

            const queryParams = {
                sortBy,
                sortDirection,
                perPage: currentPerPage,
                q: searchQuery,
                minPrice: priceRange.min,
                maxPrice: priceRange.max,
                selectedVariants: JSON.stringify(selectedVariants)
            };

            // Effettua la richiesta con i parametri corretti
            get(route(rotta, queryParams), {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => setLoading(false),
                onError: () => setLoading(false),
            });
        }, 500);

        return () => clearTimeout(timer); // Cancella il timer precedente

    }, dependencies);

    const handlePerPageChange = useCallback((e) => {
        const selectedPerPage = e.target.value;
        setCurrentPerPage(selectedPerPage);
        get(route(rotta, { sortBy, sortDirection, perPage: selectedPerPage, q: searchQuery, minPrice: priceRange.min, maxPrice: priceRange.max, selectedVariants: JSON.stringify(selectedVariants) }), {
            preserveScroll: true,
            preserveState: true,
        });
    }, dependencies);

    const handleSort = useCallback((column) => {
        // const direction = (sortBy === column && sortDirection === 'asc') ? 'desc' : 'asc';
        get(route(rotta, { sortBy: column, sortDirection, perPage: currentPerPage, q: searchQuery, minPrice: priceRange.min, maxPrice: priceRange.max, selectedVariants: JSON.stringify(selectedVariants) }), {
            preserveScroll: true,
            preserveState: true,
        });
    }, dependencies);

    const handleDirection = useCallback(() => {
        const direction = sortDirection === 'asc' ? 'desc' : 'asc';
        get(route(rotta, { sortBy, sortDirection: direction, perPage: currentPerPage, q: searchQuery, minPrice: priceRange.min, maxPrice: priceRange.max, selectedVariants: JSON.stringify(selectedVariants) }), {
            preserveScroll: true,
            preserveState: true,
        });
    }, dependencies);

    const handleApplyFilter = useCallback(() => {
        get(route(rotta, { sortBy, sortDirection, perPage: currentPerPage, q: searchQuery, minPrice: priceRange.min, maxPrice: priceRange.max, selectedVariants: JSON.stringify(selectedVariants) }), {
            preserveScroll: true,
            preserveState: true,
        });
    }, dependencies);

    return {
        handleSearchChange,
        handlePerPageChange,
        handleSort,
        handleDirection,
        handleApplyFilter,
        processing,
    };
};