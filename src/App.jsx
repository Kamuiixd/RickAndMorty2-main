import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Header from './components/layout/Header/Header';
import SideBar from './components/layout/SideBar/SideBar';
import Footer from './components/layout/Footer/Footer';
import LogInPage from './pages/LogInPage';
import { UserProvider } from './components/LogIn/UserContext';
import SearchCharacterPage from './pages/SearchCharacterPage';
import PokedexPage from './pages/PokedexPage'; // Importamos la nueva página

function App() {
  return (
    <UserProvider>
      <Router>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
          {/* Encabezado */}
          <Header />

          {/* Contenedor principal */}
          <div style={{ display: 'flex', flex: 1 }}>
            {/* Barra lateral */}
            <SideBar />

            {/* Contenido principal */}
            <main style={{ 
              flex: 1, 
              padding: '16px', 
              backgroundColor: 'black', 
              overflowY: 'auto' 
            }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LogInPage />} />
                <Route path="/pokedex" element={<PokedexPage />} /> {/* Nueva ruta para Pokedex */}
                <Route path="/search-character" element={<SearchCharacterPage />} />
              </Routes>
            </main>
          </div>

          {/* Pie de página */}
          <Footer />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;