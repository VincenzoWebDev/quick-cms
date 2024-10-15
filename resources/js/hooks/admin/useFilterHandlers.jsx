import { useCallback } from 'react';
import { useForm } from '@inertiajs/react';

export const useFilterHandlers = (rotta, sortBy, sortDirection, currentPerPage, setCurrentPerPage, searchQuery, setSearchQuery, setLoading) => {
    const { get } = useForm();

    const handleSearchChange = useCallback((e) => {
        const value = e.target.value;
        setSearchQuery(value);
        setLoading(true);

        // Imposta un nuovo timer per la ricerca
        const timer = setTimeout(() => {
            get(route(rotta, { sortBy, sortDirection, perPage: currentPerPage, q: value }), {
                preserveState: true,
                onSuccess: () => {
                    setLoading(false);
                },
                onError: (errors) => {
                    setLoading(false);
                },
            });
        }, 300);

        return () => clearTimeout(timer);
    }, [get, currentPerPage, sortBy, sortDirection, searchQuery, rotta, setSearchQuery, setLoading]);

    const handlePerPageChange = useCallback((e) => {
        const selectedPerPage = e.target.value;
        setCurrentPerPage(selectedPerPage);
        get(route(rotta, { sortBy, sortDirection, perPage: selectedPerPage, q: searchQuery }), {
            preserveScroll: true,
        });
    }, [get, currentPerPage, sortBy, sortDirection, searchQuery, rotta]);

    const handleSort = useCallback((column) => {
        const direction = (sortBy === column && sortDirection === 'asc') ? 'desc' : 'asc';
        get(route(rotta, { sortBy: column, sortDirection: direction, perPage: currentPerPage, q: searchQuery }), {
            preserveScroll: true,
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