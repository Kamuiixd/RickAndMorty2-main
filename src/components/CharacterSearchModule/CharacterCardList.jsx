import React, { useState, useContext } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
} from '@mui/material';
import WatchMoreEpisodeModal from '../modal/WatchMoreEpisodeModal';
import { CharacterContext } from './CharacterContext';

function CharacterCardList() {
  const [selectedCharacter, setSelectedCharacter] = useState(null); // Estado para el personaje seleccionado
  const [modalOpen, setModalOpen] = useState(false); // Estado para controlar el modal
  const { characters } = useContext(CharacterContext);
  console.log('CHARACTERS', characters);

  const handleOpenModal = (character) => {
    setSelectedCharacter(character); // Asigna el personaje seleccionado
    setModalOpen(true); // Abre el modal
  };

  const handleCloseModal = () => {
    setSelectedCharacter(null); // Limpia el personaje seleccionado
    setModalOpen(false); // Cierra el modal
  };

  return (
    <div style={{ padding: '20px' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)', // 4 columnas
          gap: '16px', // Espaciado entre las tarjetas
          justifyContent: 'center',
        }}
      >
        {/* Iteramos sobre los personajes y aplicamos Material UI Cards */}
        {characters.length > 0 ? (
          characters.map((character) => (
            <Card
              key={character.id}
              sx={{
                maxWidth: 345,
                height: '100%', // Asegura que todas las tarjetas tengan el mismo tamaño
                display: 'flex',
                flexDirection: 'column', // Organiza el contenido verticalmente
                justifyContent: 'space-between', // Separa contenido y botones
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              <CardMedia
                component="img"
                height="250"
                image={character.image}
                alt={character.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5">
                  {character.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Estado: {character.status}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Especie: {character.species}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Género: {character.gender}
                </Typography>
              </CardContent>
              <CardActions
                sx={{
                  mt: 'auto', // Empuja los botones hacia el fondo
                  justifyContent: 'center', // Centra el botón
                }}
              >
                {/* Botón para abrir el modal */}
                <Button
                  size="small"
                  onClick={() => handleOpenModal(character)} // Abre el modal con los datos del personaje
                >
                  Ver más
                </Button>
              </CardActions>
            </Card>
          ))
        ) : (
          <Typography variant="body1" color="text.secondary" textAlign="center">
            No se encontraron personajes.
          </Typography>
        )}
      </div>

      {/* Modal dinámico */}
      {modalOpen && selectedCharacter && (
        <WatchMoreEpisodeModal
          character={selectedCharacter} // Pasa el personaje seleccionado al modal
          open={modalOpen} // Controla si el modal está abierto
          onClose={handleCloseModal} // Maneja el cierre del modal
        />
      )}
    </div>
  );
}

export default CharacterCardList;
