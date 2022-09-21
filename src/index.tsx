import React from "react";
import { createRoot } from "react-dom/client";
import { ascDefaultTheme, GlobalStyle, ThemeProvider } from "@amsterdam/asc-ui";

import App from "./App";
import { SubsidieDataProvider } from "./DataProvider";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <ThemeProvider
      theme={{
        ...ascDefaultTheme,
        typography: { ...ascDefaultTheme.typography, fontFamily: "Amsterdam Sans, Arial, Helvetica, sans-serif" },
      }}
    >
      <GlobalStyle />
      <SubsidieDataProvider>
        <App />
      </SubsidieDataProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
