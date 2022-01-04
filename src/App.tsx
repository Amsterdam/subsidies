import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { Column, Row, themeColor } from "@amsterdam/asc-ui";

import Lijst from "./Lijst";
import Feiten from "./Feiten";

const OuterWrapper = styled.div`
  background-color: ${themeColor("tint", "level3")};

  @media print {
    background-color: ${themeColor("tint", "level1")};
  }
`;

const InnerWrapper = styled.div`
  background-color: ${themeColor("tint", "level1")};
`;

const App = () => {
  return (
    <OuterWrapper>
      <Row>
        <Column span={12}>
          <InnerWrapper>
            <Router>
              <Routes>
                <Route path="/lijst" element={<Lijst />} />
                <Route path="/" element={<Feiten />} />
              </Routes>
            </Router>
          </InnerWrapper>
        </Column>
      </Row>
    </OuterWrapper>
  );
};

export default App;
