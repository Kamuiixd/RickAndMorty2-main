import React, { useState, useEffect } from 'react'
import CharacterInputBox from '../components/CharacterSearchModule/CharacterInputBox';
import CharacterPagination from '../components/CharacterSearchModule/CharacterPagination';
import CharacterCardList from '../components/CharacterSearchModule/CharacterCardList';
import { Box, Container } from '@mui/material';


function SearchCharacterPage() {

    const [characters, setCharacters] = useState([]); // Guardamos los personajes en una lista
    const [error, setError] = useState(''); // Mensajes de error si ocurren
    const [loading, setLoading] = useState(false); // Estado para mostrar el spinner
    const [page, setPage] = useState(1); // Guardamos las páginas de la API
    const [totalPages, setTotalPages] = useState(1); // Guardamos el total de páginas de la API
    const [searchName, setSearchName] = useState(" ");

    // FUNCIONES GLOBALES PARA HACER LE FETCH DE LOS PERSONAJES

    const fetchCharacters = async (name, page) => {
        try {
            const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${name}&page=${page}`);
            const data = await response.json();
            setCharacters(data.results);
            setTotalPages(data.info.pages);
            console.log('URL FETCH API', response);
            console.log('totalPage', characters);
        } catch (error) {
            setError(error)
        }
    };

    useEffect(() => {
        fetchCharacters(searchName, page); // Usa el término de búsqueda dinámico
    }, [page, searchName]);






    return (
        <Container>
            <Box>
                <CharacterInputBox onSearch={(name) => { setSearchName(name); setPage(1) }} />
            </Box>

            <Box>
                <CharacterPagination
                    page={page}
                    totalPages={totalPages}
                    onNext={() => setPage(page + 1)}
                    onPrev={() => setPage(page - 1)}
                />
            </Box>

            <Box>
                <CharacterCardList characters={characters} />
            </Box>
        </Container>
    )
}

export default SearchCharacterPage;