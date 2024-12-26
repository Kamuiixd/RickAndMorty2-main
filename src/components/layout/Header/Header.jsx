// src/components/layout/Header/Header.jsx
import React, { useContext } from "react";
import { Layout, Menu, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../LogIn/UserContext";

const { Header } = Layout;

const HeaderComponent = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Agregamos la navegación para cada ítem del menú
  const handleMenuClick = (key) => {
    switch (key) {
      case "1":
        navigate("/");
        break;
      case "2":
        navigate("/about");
        break;
      case "3":
        navigate("/login");
        break;
      case "4":
        navigate("/pokedex");
        break;
      default:
        break;
    }
  };

  // Agregamos el ítem de Pokedex al menú
  const items = [
    { key: "1", label: "Home", onClick: () => handleMenuClick("1") },
    { key: "2", label: "About", onClick: () => handleMenuClick("2") },
    { key: "3", label: "Login", onClick: () => handleMenuClick("3") },
    { key: "4", label: "Pokedex", onClick: () => handleMenuClick("4") },
  ];

  return (
    <Header 
      style={{ 
        display: "flex", 
        alignItems: "center", 
        background: "#001529", 
        padding: "0 16px" 
      }}
    >
      <div 
        className="logo" 
        style={{ 
          color: "white", 
          fontSize: "20px", 
          fontWeight: "bold", 
          marginRight: "auto" 
        }}
      >
        Mi Aplicación
      </div>
      <Menu 
        theme="dark" 
        mode="horizontal" 
        defaultSelectedKeys={["1"]} 
        items={items} 
        style={{ flex: 1 }} 
      />
      {user && (
        <Button
          onClick={handleLogout}
          style={{
            backgroundColor: "red",
            color: "white",
            border: "none",
            padding: "8px 16px",
            cursor: "pointer",
          }}
        >
          Cerrar sesión
        </Button>
      )}
    </Header>
  );
};

export default HeaderComponent;