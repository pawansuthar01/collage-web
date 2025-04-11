import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { DataStore } from "./Redux/Store.ts";
import { Toaster } from "react-hot-toast";

const container = document.getElementById("root") as HTMLElement;

createRoot(container).render(
  <StrictMode>
    <Provider store={DataStore}>
      <BrowserRouter>
        <App />
        <Toaster position={"top-center"} />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
