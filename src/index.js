import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvicer } from "./context/AuthContext";
import { NotesContextProvider } from "./context/NotesContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="131058004428-f817ho9ecavt1ph0drrgeqfv5rphsila.apps.googleusercontent.com">
      <AuthContextProvicer>
        <NotesContextProvider>
          <App />
        </NotesContextProvider>
      </AuthContextProvicer>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
