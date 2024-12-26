// src/pages/Home.jsx
import React, { useContext } from 'react';
import { UserContext } from '../components/LogIn/UserContext';
import { useNavigate } from 'react-router-dom';
import { Alert, Box } from '@mui/material';
import SearchCharacterPage from './SearchCharacterPage';

function Home() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  if (!user) {
    // Si no hay usuario logeado, mostrar mensaje y redirigir a login
    return (
      <Box sx={{ width: '100%', padding: '20px', display: 'flex', justifyContent: 'center' }}>
        <Alert severity="warning" sx={{ width: '100%', maxWidth: 600, textAlign: 'center' }}>
          Se necesita iniciar sesión para poder acceder al contenido.
        </Alert>
      </Box>
    );
  }

  return (
    <div className="home">
      <div>Home</div>
      <div><SearchCharacterPage /></div>
    </div>
  );
}

export default Home;
