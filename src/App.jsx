import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Layout from "./pages/Layout";
import NotFound from "./pages/404";
import Login from "./pages/Login";
import Contacts from "./pages/Contacts";
import Loading from "./components/Loading";

const theme = createTheme({
  palette: {
    white: {
      main: "#FFFFFF",
      contrastText: "#000000",
    },
    primary: {
      main: "#2B45D9",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#6669FF",
      contrastText: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
    button: {
      fontWeight: 700,
      textTransform: "none",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: { boxShadow: "none" },
      },
    },
    MuiList: {
      styleOverrides: {
        root: { padding: "0px" },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          paddingRight: "0",
          borderRadius: "8px",
          width: "100%",
          "&.Mui-selected": {
            backgroundColor: "#2B45D9",
            color: "#FFFFFF",
          },
          "&.Mui-selected:hover": {
            backgroundColor: "#2B45D9",
            color: "#FFFFFF",
          },
          "&:hover": {
            backgroundColor: "#D5C5FF",
            color: "#000000",
          },
        },
      },
    },
  },
});

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  console.log(isAuthenticated);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Layout /> : <Login />}>
          <Route path="contacts" element={<Contacts />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
