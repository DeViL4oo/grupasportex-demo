import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import App from "./App";

export { pageMeta } from "./data/meta";

/**
 * Render serwerowy do prerenderingu statycznego HTML (scripts/prerender.mjs).
 * Aplikacja nie korzysta z React.lazy, więc renderToString wystarcza.
 */
export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>
  );
}
