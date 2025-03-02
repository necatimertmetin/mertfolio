import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import App from "./App"; // Your main app component

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
