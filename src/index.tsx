import { createRoot } from "react-dom/client";
import App from "./components/App";
import { StrictMode } from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { BasketProvider } from "./context/BasketContext";

const theme = createTheme({
  palette: {
    primary: {
      main: "#008000",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    h1: {
      fontSize: "3rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "1.75rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
  },
});

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <BasketProvider>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </BasketProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
