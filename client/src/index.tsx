import { createRoot } from "react-dom/client";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { StrictMode } from "react";

const rootElement = document.getElementById("root") as HTMLElement;
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

serviceWorker.unregister();