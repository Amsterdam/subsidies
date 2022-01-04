import React from "react";
import ReactDOM from "react-dom";
import { GlobalStyle, ThemeProvider } from "@amsterdam/asc-ui";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
