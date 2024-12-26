import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  bgcolor: '#b3e5fc', // Fondo celeste
  boxShadow: 24,
  p: 4,
  color: 'black',
  borderRadius: '8px',
};

export default function WatchMoreEpisodeModal({ character, open, onClose }) {
  const [currentPage, setCurrentPage] = useState(1); 
  const episodesPerPage = 6; 

  // Calcula los índices de los episodios visibles en la página actual
  const indexOfLastEpisode = currentPage * episodesPerPage;
  const indexOfFirstEpisode = indexOfLastEpisode - episodesPerPage;
  const currentEpisodes = character.episode.slice(
    indexOfFirstEpisode,
    indexOfLastEpisode
  );


  const handleNextPage = () => {
    if (indexOfLastEpisode < character.episode.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Box display="flex" gap="16px" mb={4}>
          <img
            src={character.image}
            alt={character.name}
            style={{ width: '150px', borderRadius: '8px' }}
          />
          <Box>
            <Typography variant="h5" sx={{ color: 'black', fontWeight: 'bold' }}>
              {character.name}
            </Typography>
            <Typography sx={{ color: 'black' }}>Estado: {character.status}</Typography>
            <Typography sx={{ color: 'black' }}>Especie: {character.species}</Typography>
            <Typography sx={{ color: 'black' }}>Género: {character.gender}</Typography>
          </Box>
        </Box>

        <Typography variant="h6" sx={{ mb: 2, color: 'black', fontWeight: 'bold' }}>
          Lista de Episodios
        </Typography>

        <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>#</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>
                  Nombre del Episodio
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentEpisodes.map((episode, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ color: 'black' }}>
                    {indexOfFirstEpisode + index + 1}
                  </TableCell>
                  <TableCell sx={{ color: 'black' }}>{episode}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Anterior
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNextPage}
            disabled={indexOfLastEpisode >= character.episode.length}
          >
            Siguiente
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
