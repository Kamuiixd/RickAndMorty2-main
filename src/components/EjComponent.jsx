import React, { useState, useEffect } from 'react';
import {TextField, MenuItem, Button, Checkbox, Radio, FormControlLabel, RadioGroup, FormGroup, Stack, Typography, Box,} from '@mui/material';

function EjComponent() {
  const [value, setValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [agree, setAgree] = useState(false);
  const [file, setFile] = useState(null);
  const [countryName, setCountryName] = useState('');
  const [countryData, setCountryData] = useState(null);
  const [error, setError] = useState(null);

  // Fetch country data
  const fetchCountryData = async () => {
    if (!countryName.trim()) {
      setError('Please enter a country name');
      return;
    }

    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${countryName.toLowerCase()}`);
      const data = await response.json();

      if (data.status === 404) {
        throw new Error('Country not found');
      }

      const country = data[0];
      setCountryData({
        name: country.name.common,
        region: country.region,
        population: country.population,
        capital: country.capital ? country.capital[0] : 'No capital',
        flag: country.flags.svg,
      });
      setError(null);
    } catch (err) {
      setError(err.message);
      setCountryData(null);
    }
  };

  //HANDLE para seleccionar el tipo de pais y lo guarda.
  const handleSearchCountry = (e) => {
    e.preventDefault();
    fetchCountryData();
  };

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Formulario
      </Typography>
      <form onSubmit={handleSearchCountry}>
        {/* Nombre */}
        <TextField
          label="Nombre"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        {/* Contraseña */}
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        {/* Campo de país */}
        <TextField
          label="Nombre del país"
          value={countryName}
          onChange={(e) => setCountryName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Stack direction="row" spacing={2} marginTop={2}>
          <Button variant="contained" color="primary" type="submit">
            Buscar País
          </Button>
        </Stack>
      </form>

      {/* Resultados del país */}
      {error && <Typography color="error">{error}</Typography>}
      {countryData && (
        <Box sx={{ marginTop: 3 }}>
          <Typography variant="h6">Información del País</Typography>
          <img src={countryData.flag} alt={`${countryData.name} flag`} width="200" />
          <Typography><strong>Nombre:</strong> {countryData.name}</Typography>
          <Typography><strong>Región:</strong> {countryData.region}</Typography>
          <Typography><strong>Población:</strong> {countryData.population.toLocaleString()}</Typography>
          <Typography><strong>Capital:</strong> {countryData.capital}</Typography>
        </Box>
      )}
    </Box>
  );
}

export default EjComponent;
