import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import App from "./App"; // Your main app component

createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename="/mertfolio">
    <App />
  </BrowserRouter>
);
