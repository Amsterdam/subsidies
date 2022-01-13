import styled from "styled-components";

import { Footer, FooterTop, Row, Column, FooterSection, themeSpacing } from "@amsterdam/asc-ui";

const StyledFooter = styled(Footer)`
  margin-top: ${themeSpacing(18)};

  @media print {
    display: none;
  }
`;

const SubsidieFooter = () => {
  return (
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
                Amsterdam.nl is de plek online waar u alle nieuws en publieksinformatie van de gemeente en stadsdelen
                vindt.
              </p>

              <a href="https://www.amsterdam.nl/">&gt; Naar Amsterdam.nl</a>
            </FooterSection>
          </Column>
        </Row>
      </FooterTop>
    </StyledFooter>
  );
};

export default SubsidieFooter;
