import ReactDOM
from "react-dom/client";

import App from "./App";

import {
  AuthProvider,
} from "./context/AuthContext";

import {
  ThemeProvider,
} from "./context/ThemeContext";

import { Toaster }
from "react-hot-toast";

import "./index.css";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <ThemeProvider>

    <AuthProvider>

      <Toaster
        position="top-right"
        reverseOrder={false}
      />

      <App />

    </AuthProvider>

  </ThemeProvider>
);