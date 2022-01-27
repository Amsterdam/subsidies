import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { vega } from "vega-embed";

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
    <Router>
      <Routes>
        <Route path="/lijst" element={<Lijst />} />
        <Route path="/" element={<Feiten />} />
      </Routes>
    </Router>
  );
};

export default App;
