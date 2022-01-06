import React from "react";
import ReactDOM from "react-dom";
import { GlobalStyle, ThemeProvider } from "@amsterdam/asc-ui";

import App from "./App";
import { SubsidieDataProvider } from "./DataProvider";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <GlobalStyle />
      <SubsidieDataProvider>
        <App />
      </SubsidieDataProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
