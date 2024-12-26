import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const PokedexComponent = ({ pokemon }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {pokemon?.name || 'Select a Pokemon'}
        </Typography>
        {pokemon && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography>Type: {pokemon.type}</Typography>
            </Grid>
          </Grid>
        )}
      </CardContent>
    </Card>
  );
};

export default PokedexComponent;