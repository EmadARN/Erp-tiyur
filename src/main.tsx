import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import { store } from "./modules/shared/store/store.ts";
import App from "./App.tsx";
import { ThemeProvider } from "./modules/shared/components/ThemeProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
