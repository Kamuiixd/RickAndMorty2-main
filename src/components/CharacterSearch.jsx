import React, { useState, useEffect, useRef } from "react";
import './CharacterSearch.css';



function CharacterSearch() {
  const [characters, setCharacters] = useState([]); // Guardamos los personajes en una lista
  const [error, setError] = useState(''); // Mensajes de error si ocurren
  const [isAlive, setIsAlive] = useState(false); // Estado para el checkbox (si el checkbox está marcado)
  const [loading, setLoading] = useState(true); // Estado para mostrar el spinner
  const [page, setPage] = useState(1); // Guardamos las páginas de la API
  const [totalPages, setTotalPages] = useState(1); // Guardamos el total de páginas de la API
  const [searchName, setSearchName] = useState(null);
  const searchInput = useRef();

  // Función para consumir la API de Rick and Morty y traer los personajes por nombre
  const fetchCharacters = async (name, status) => {

    setLoading(true); // Mostramos el spinner antes de cargar los personajes

    try {
      let url = `https://rickandmortyapi.com/api/character/?name=${name}&page=${page}`;
      if (status) {
        url += `&status=alive`; // Si el checkbox está marcado.
      }

      const response = await fetch(url);
      const data = await response.json();
      setCharacters(data.results);
      setTotalPages(data.info.pages);
      setLoading(null);
    } catch (error) {
      setError('Error al obtener personajes');
    }
  };

  useEffect(() => {
    fetchCharacters(searchName, isAlive); // Usa el término de búsqueda dinámico
  }, [page, searchName, isAlive]);

  // HANDLE para realizar la búsqueda del personaje
  const handleSearch = () => {
    setSearchName(searchInput.current.value); // Actualiza el estado
    setPage(1); // Resetea la página al buscar
  };

  // HANDLE para realizar la búsqueda al presionar la tecla Enter
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  // HANDLE para cambiar el estado del checkbox
  const handleCheckboxChange = () => {
    setIsAlive(!isAlive); // Cambia el estado cuando el checkbox es marcado/desmarcado
  };

  //HANDLE para paginacion de personajes
  const handleNextPress = (event) => {
    if (page < totalPages) setPage(page + 1);
    console.log('Next', page);
  };

  const handlePrevPress = (event) => {
    if (page > 1) setPage(page - 1);
    console.log('Prev', page);
  };

  return (

    <div>
      <input
        type="text"
        placeholder="Buscar Personaje"
        ref={searchInput}
        onKeyDown={handleKeyDown}
      />
      <label>
        <input
          type="checkbox"
          checked={isAlive}
          onChange={handleCheckboxChange}
        />
        Sólo vivos?
      </label>

      <button onClick={handleSearch}>
        Buscar
      </button>
      <span>{page} de {totalPages}</span>
      <button onClick={handlePrevPress} disabled={page === 1}>Anterior</button>
      <button onClick={handleNextPress} disabled={page === totalPages}>Siguiente</button>


      <div className="box-personaje">
        {/* Vamos a iterar sobre los personajes mapeados y traer los atributos de cada uno */}
        {characters.length > 0 ? (
          characters.map((character) => (
            <div className="card-personajes-container" key={character.id}>
              <div>
                <img src={character.image} alt={character.name} />
              </div>
              <div>
                <h3>Nombre: {character.name}</h3>
                <p>Estado: {character.status}</p>
                <p>Especie: {character.species}</p>
                <p>Género: {character.gender}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No se encontraron personajes.</p>
        )}
      </div>
    </div>
  );
}

export default CharacterSearch;
