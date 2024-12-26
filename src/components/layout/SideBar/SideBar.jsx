import React from "react";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const SideBar = () => {
  const navigate = useNavigate();
  const items = [
    { key: "1", label: "Home", icon: <PieChartOutlined />, onClick: () => navigate("/Home") },
    { key: "2", label: "Registro", icon: <PieChartOutlined />, onClick: () => navigate("/Register") },
    {
      key: "3",
      label: "Login",   
      icon: <DesktopOutlined />,
      onClick: () => navigate("/LogIn"),
    },
  ];

  return (
    <Sider collapsible width={256}>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={items.map(({ key, label, icon, onClick }) => ({
          key,
          label,
          icon,
          onClick,
        }))}
      />
    </Sider>
  );
};

export default SideBar;
