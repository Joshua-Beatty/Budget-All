import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./main.css";
import { ThemeProvider } from "./components/ui/themeprovider";
import Settings from "./pages/Settings/Settings";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <HashRouter>
        <Routes>
        <Route path="/" element={<App />} />
        <Route path="/settings" element={<Settings />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  </React.StrictMode>
);
