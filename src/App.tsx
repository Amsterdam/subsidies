import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { vega } from "vega-embed";
import { ascDefaultTheme, GlobalStyle, ThemeProvider } from "@amsterdam/asc-ui";

import { SubsidieDataProvider } from "./DataProvider";
import Lijst from "./Lijst/Index";
import Feiten from "./Feiten/Index";

import "./App.scss";

const App = () => {
  vega.formatLocale({
    decimal: ",",
    thousands: ".",
    grouping: [3],
    currency: ["\u00a0€", ""],
  });

  return (
    <ThemeProvider
      theme={{
        ...ascDefaultTheme,
        typography: { ...ascDefaultTheme.typography, fontFamily: "Amsterdam Sans, Arial, Helvetica, sans-serif" },
      }}
    >
      <GlobalStyle />
      <SubsidieDataProvider>
        <Router>
          <Routes>
            <Route path="/lijst" element={<Lijst />} />
            <Route path="/" element={<Feiten />} />
          </Routes>
        </Router>
      </SubsidieDataProvider>
    </ThemeProvider>
  );
};

export default App;
