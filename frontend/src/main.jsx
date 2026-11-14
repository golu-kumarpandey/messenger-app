import { createRoot } from "react-dom/client";
import axios from "axios";
import "./index.css";
import App from "./App.jsx";
import store from "../store.js";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { isDark } from "./utils/helper.js";

const apiUrl = import.meta.env.VITE_API_URL;
if (apiUrl) {
  axios.defaults.baseURL = apiUrl.startsWith("http")
    ? apiUrl
    : `https://${apiUrl}`;
}

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Toaster
      position="top-center"
      reverseOrder={true}
      gutter={8}
      toastOptions={{
        duration: 3000,
        style: {
          background: isDark ? "#2D2D3D" : "#FFFFFF",
          color: isDark ? "#E8E8F0" : "#1A1A2A",
          boxShadow: isDark
            ? "0 4px 20px rgba(0, 0, 0, 0.4)"
            : "0 4px 20px rgba(0, 0, 0, 0.08)",
          borderRadius: "12px",
          padding: "14px 20px",
          fontSize: "14px",
          fontWeight: "500",
          border: isDark ? "1px solid #3D3D4D" : "1px solid #E8E8F0",
        },
        success: {
          duration: 3000,
          style: {
            background: isDark ? "#1A3A2A" : "#E8F5E9",
            color: isDark ? "#E8F5E9" : "#1B5E20",
            border: isDark ? "1px solid #2A4A3A" : "1px solid #C8E6C9",
          },
          iconTheme: {
            primary: "#22c55e",
            secondary: isDark ? "#1A3A2A" : "#FFFFFF",
          },
        },
        error: {
          duration: 3000,
          style: {
            background: isDark ? "#3A1A1A" : "#FFEBEE",
            color: isDark ? "#FFEBEE" : "#B71C1C",
            border: isDark ? "1px solid #4A2A2A" : "1px solid #FFCDD2",
          },
          iconTheme: {
            primary: "#ef4444",
            secondary: isDark ? "#3A1A1A" : "#FFFFFF",
          },
        },
        loading: {
          duration: 3000,
          style: {
            background: isDark ? "#2D2D3D" : "#FFFFFF",
            color: isDark ? "#E8E8F0" : "#1A1A2A",
            border: isDark ? "1px solid #3D3D4D" : "1px solid #E8E8F0",
          },
        },
      }}
    />

    <App />
  </Provider>,
);
