import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CssBaseline from "@mui/material/CssBaseline";
import { Auth0Provider } from "@auth0/auth0-react";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Auth0Provider
          domain={import.meta.env.VITE_AUTH_DOMAIN}
          clientId={import.meta.env.VITE_AUTH_CLIENT_ID}
          authorizationParams={{
            redirect_uri: window.location.origin,
            audience: import.meta.env.VITE_AUTH_AUDIENCE,
            scope:
              "openid profile email read:current_user update:current_user_metadata",
          }}
        >
          <CssBaseline />
          <App />
        </Auth0Provider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
