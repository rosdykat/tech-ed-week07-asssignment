import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Form from "./Components/Form.jsx";
import StickyNote from "./Components/StickyNote.jsx";
import Header from "./Components/Header.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Header />
    <App />
    <Form />
    <StickyNote />
  </StrictMode>
);
