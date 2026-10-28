import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

const basename = import.meta.env.BASE_URL.replace(/\/+$/, "") || "/";
const container = document.getElementById("root")!;

const tree = (
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>
);

const normalize = (value: string) => value.replace(/\/+$/, "") || "/";

/**
 * Hydratacja tylko wtedy, gdy prerenderowany HTML odpowiada aktualnemu adresowi.
 * Hostingi z fallbackiem SPA (np. `vite preview`) podają index.html dla każdej
 * trasy — wtedy bezpieczniej renderujemy od zera niż hydratujemy obcy markup.
 */
const prerenderedRoute = container.dataset.route;
const canHydrate =
  container.hasChildNodes() &&
  !!prerenderedRoute &&
  normalize(prerenderedRoute) === normalize(window.location.pathname);

let started = false;

function start() {
  if (started) return;
  started = true;
  if (canHydrate) {
    hydrateRoot(container, tree);
  } else {
    container.replaceChildren();
    createRoot(container).render(tree);
  }
}

/* Prerenderowany HTML jest już w drzewie — React przejmuje go natychmiast. */
start();
