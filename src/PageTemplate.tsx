import styled from "styled-components";
import { Row, Column, themeSpacing, themeColor } from "@amsterdam/asc-ui";

import SubsidieFooter from "./Components/SubsidieFooter";
import SubsidieHeader from "./Components/SubsidieHeader";
import { useEffect } from "react";

const Page = styled.div`
  background-color: ${themeColor("tint", "level3")};

  @media print {
    background-color: ${themeColor("tint", "level1")};
  }
`;

const InnerWrapper = styled.div`
  width: 100%;
  background-color: ${themeColor("tint", "level1")};
`;

const HeaderRow = styled(Row)`
  position: sticky;
  top: 0;
  z-index: 20;
`;

const Content = styled.div`
  padding-left: ${themeSpacing(11)};
  padding-right: ${themeSpacing(11)};
`;

const PageTemplate = ({ children }) => {
  useEffect(() => {
    // Scroll to top on page load.
    window?.scrollTo(0, 0);
  }, []);

  return (
    <Page>
      <HeaderRow>
        <Column span={12}>
          <InnerWrapper>
            <SubsidieHeader />
          </InnerWrapper>
        </Column>
      </HeaderRow>

      <Row>
        <Column span={12}>
          <InnerWrapper>
            <Content>{children}</Content>
            <SubsidieFooter />
          </InnerWrapper>
        </Column>
      </Row>
    </Page>
  );
};

export default PageTemplate;
