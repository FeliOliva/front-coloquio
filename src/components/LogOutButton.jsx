import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

const LogOutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button
      type="primary"
      icon={<LogoutOutlined />}
      onClick={() => logout({ returnTo: window.location.origin })}
      style={styles.logoutButton}
    >
      Cerrar sesión
    </Button>
  );
};

const styles = {
  logoutButton: {
    width: "100%",
    maxWidth: "150px",
    margin: "8px 0",
    backgroundColor: "#ff4d4f",
    borderColor: "#ff4d4f",
  },
};

export default LogOutButton;
