import React, { createContext, useEffect, useState } from 'react';

export const CharacterContext = createContext();

// Proveedor
export const CharacterProvider = ({ children }) => {
    const [characters, setCharacters] = useState([]); // Lista de personajes
    const [error, setError] = useState(''); // Mensajes de error
    const [loading, setLoading] = useState(false); // Indicador de carga
    const [page, setPage] = useState(1); // Página actual
    const [totalPages, setTotalPages] = useState(1); // Total de páginas
    const [searchName, setSearchName] = useState(''); // Término de búsqueda

    // Función para hacer fetch de los personajes
    const fetchCharacters = async (name, page) => {
        try {
            setLoading(true);
            const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${name}&page=${page}`);
            const data = await response.json();

            if (data.error) {
                setCharacters([]);
                setTotalPages(1);
                setError(data.error);
            } else {
                setCharacters(data.results || []);
                setTotalPages(data.info.pages || 1);
                setError('');
            }
        } catch (err) {
            setError('Hubo un problema al obtener los datos.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCharacters(searchName, page);
    }, [searchName, page]);

    return (
        <CharacterContext.Provider
            value={{
                characters,
                error,
                loading,
                page,
                totalPages,
                searchName,
                setCharacters,
                setError,
                setLoading,
                setPage,
                setSearchName,
                setTotalPages,
            }}
        >
            {children}
        </CharacterContext.Provider>
    );
};
