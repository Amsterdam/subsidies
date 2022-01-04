import styled from "styled-components";

import { Header, Footer, FooterTop, Row, Column, FooterSection, themeSpacing, themeColor } from "@amsterdam/asc-ui";
import { Link } from "react-router-dom";

const StyledFooter = styled(Footer)`
  margin-top: ${themeSpacing(18)};

  @media print {
    display: none;
  }
`;

const Page = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: [header] auto [main] 1fr [footer] auto;
`;

const ContentArea = styled.div`
  grid-area: main;
  overflow: auto;

  @media print {
    overflow: initial;
  }
`;

const Content = styled.div`
  padding-left: ${themeSpacing(11)};
  padding-right: ${themeSpacing(11)};
`;

const HeaderArea = styled.div`
  grid-area: header;
`;

const HeaderLink = styled(Link)`
  margin-right: ${themeSpacing(4)};
  color: ${themeColor("tint", "level5")};
  text-decoration: none;
  font-weight: 500;

  &:last-child {
    margin-right: 0;
  }
`;

const SubsidieHeader = styled(Header)`
  padding-left: ${themeSpacing(11)};
  padding-right: ${themeSpacing(11)} !important;

  margin-bottom: ${themeSpacing(12)};
`;

const PageTemplate = ({ children }) => {
  return (
    <Page>
      <HeaderArea>
        <SubsidieHeader
          tall={false}
          title="Subsidieregister"
          homeLink=""
          fullWidth
          css={{ zIndex: 20 }}
          navigation={
            <>
              <HeaderLink to="/">Feiten</HeaderLink>
              <HeaderLink to="/lijst">Lijst</HeaderLink>
            </>
          }
        />
      </HeaderArea>
      <ContentArea>
        <Content>{children}</Content>
        <StyledFooter>
          <FooterTop>
            <Row>
              <Column span={6}>
                <FooterSection title="Contact">
                  <p>Hebt u een vraag en kunt u het antwoord niet vinden op onze website?</p>
                  <ul>
                    <li>Bel dan het gemeentelijk informatienummer 14 020, op werkdagen van 08.00 tot 18.00 uur.</li>
                    <li>
                      Of stuur een e-mail naar:{" "}
                      <a href="mailto:mailto:subsidies@amsterdam.nl?Subject=Vraag%20subsidieregister">
                        Mailbox subsidieregister
                      </a>
                      .
                    </li>
                  </ul>
                </FooterSection>
              </Column>
              <Column span={6}>
                <FooterSection title="Amsterdam.nl">
                  <p>
                    Amsterdam.nl is de plek online waar u alle nieuws en publieksinformatie van de gemeente en
                    stadsdelen vindt.
                  </p>

                  <a href="https://www.amsterdam.nl/">&gt; Naar Amsterdam.nl</a>
                </FooterSection>
              </Column>
            </Row>
          </FooterTop>
        </StyledFooter>
      </ContentArea>
    </Page>
  );
};

export default PageTemplate;
