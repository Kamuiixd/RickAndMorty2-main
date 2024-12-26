// src/pages/Register.jsx
import React, { useState } from "react";
import { TextField, Button, Box, Typography, Container, FormControlLabel, Checkbox } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (!username || !password || !confirmPassword) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden. Por favor, inténtalo de nuevo.");
      return;
    }

    if (!acceptTerms) {
      alert("Debes aceptar los términos y condiciones para registrarte.");
      return;
    }

    // Simulación de registro exitoso
    alert("Registro exitoso. ¡Ahora puedes iniciar sesión!");
    navigate("/login");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "8px",
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: "20px", fontWeight: "bold" }}>
          Registrarse
        </Typography>
        <form onSubmit={handleRegister} style={{ width: "100%" }}>
          <TextField
            label="Usuario"
            variant="outlined"
            fullWidth
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ marginBottom: "20px" }}
          />
          <TextField
            label="Contraseña"
            variant="outlined"
            type="password"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginBottom: "20px" }}
          />
          <TextField
            label="Confirmar contraseña"
            variant="outlined"
            type="password"
            fullWidth
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{ marginBottom: "20px" }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                required
              />
            }
            label="Acepto los términos y condiciones"
            sx={{ marginBottom: "20px" }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#3f51b5",
              "&:hover": { backgroundColor: "#303f9f" },
              padding: "10px",
            }}
          >
            Registrarse
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default Register;
