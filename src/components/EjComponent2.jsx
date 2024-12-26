import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function MyDialog({ open, onClose, onSubmit }) {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    onSubmit(name);
    setName('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Formulario de Contacto</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Nombre"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} color="primary">
          Enviar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function App() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (name) => {
    console.log('Formulario enviado con el nombre:', name);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Abrir Diálogo
      </Button>
      <MyDialog open={open} onClose={handleClose} onSubmit={handleSubmit} />
    </div>
  );
}

export default App;