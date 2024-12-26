import React, { useState } from 'react';
import { Input, message, Button } from 'antd';
import axios from 'axios';
import './PokedexPage.css';

const PokedexPage = () => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [shiny, setShiny] = useState(false);
  const [view3D, setView3D] = useState(false);
  const [evolutions, setEvolutions] = useState([]);

  const fetchPokemon = async (nameOrId) => {
    try {
      setLoading(true);
      setEvolutions([]);
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nameOrId.toLowerCase()}`);
      const speciesResponse = await axios.get(response.data.species.url);

      const description = speciesResponse.data.flavor_text_entries.find(
        (entry) => entry.language.name === 'es'
      )?.flavor_text || speciesResponse.data.flavor_text_entries[0].flavor_text;

      setPokemon({
        ...response.data,
        description: description.replace(/\f/g, ' '),
      });

      // Obtener cadena evolutiva
      const evolutionChainUrl = speciesResponse.data.evolution_chain.url;
      const evolutionResponse = await axios.get(evolutionChainUrl);
      const evolutionData = evolutionResponse.data.chain;
      const allEvolutions = [];

      let currentEvolution = evolutionData;
      while (currentEvolution) {
        const evolutionDetails = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${currentEvolution.species.name}`
        );
        allEvolutions.push({
          name: currentEvolution.species.name,
          image: evolutionDetails.data.sprites.other['official-artwork'].front_default,
        });
        currentEvolution = currentEvolution.evolves_to[0];
      }
      setEvolutions(allEvolutions);
    } catch (error) {
      message.error('Pokémon no encontrado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pokedex-container">
      <div className="screen-container">
        <Input.Search
          placeholder="Buscar Pokémon por nombre o número"
          loading={loading}
          onSearch={fetchPokemon}
          className="search-bar"
        />

        {pokemon && (
          <>
            <div className="main-screen">
              {view3D ? (
                <img
                  src={pokemon.sprites.versions['generation-v']['black-white'].animated.front_default}
                  alt={`${pokemon.name} 3D`}
                  className="pokemon-image-3d"
                />
              ) : (
                <img
                  src={
                    shiny
                      ? pokemon.sprites.other['official-artwork'].front_shiny
                      : pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default
                  }
                  alt={pokemon.name}
                  className="pokemon-image"
                />
              )}
            </div>
            <div className="description-box">{pokemon.description}</div>
            <div className="button-row">
              <Button className="action-button" onClick={() => setShiny(!shiny)}>
                {shiny ? 'Mostrar Normal' : 'Mostrar Shiny'}
              </Button>
              <Button className="action-button" onClick={() => setView3D(!view3D)}>
                {view3D ? 'Desactivar 3D' : 'Activar 3D'}
              </Button>
            </div>
          </>
        )}
      </div>

      {pokemon && (
        <div>
          <div className="stats-screen">
            <h3 className="pokemon-title">
              {pokemon.name} No.{pokemon.id}
            </h3>
            {pokemon.stats.map((stat) => (
              <div key={stat.stat.name}>
                {stat.stat.name}...........{stat.base_stat}
              </div>
            ))}
          </div>

          <div className="evolution-container">
            {evolutions.map((evo) => (
              <div key={evo.name}>
                <img
                  src={evo.image}
                  alt={evo.name}
                  className="evolution-image"
                  onClick={() => fetchPokemon(evo.name)}
                />
                <div className="evolution-name">{evo.name}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PokedexPage;
