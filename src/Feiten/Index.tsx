import styled from "styled-components";
import { Column, Paragraph, Row, themeColor } from "@amsterdam/asc-ui";
import PageTemplate from "../PageTemplate";
import RegisterGebruikInfo from "./RegisterGebruikInfo";
import AangevraagdVerleendVastgesteld from "./AangevraagdVerleendVastgesteld";
import VerleendPerThema from "./VerleendPerThema";
import Soort from "./Soort";

const MetaInformation = styled.p`
  width: 100%;
  color: ${themeColor("tint", "level5")};
  text-align: right;
`;

const Feiten = () => {
  return (
    <PageTemplate>
      <Row>
        <Column push={3} span={6}>
          <div>
            <h1>Feiten</h1>
            <Paragraph>
              Met het openbaar subsidieregister verbetert Amsterdam de transparantie over de subsidies die de gemeente
              verstrekt. Het register bevat alle door de gemeente Amsterdam behandelde subsidieaanvragen vanaf 2016 die
              zijn verwerkt in het gemeentelijke subsidiebeheersysteem en wordt wekelijks bijgewerkt.
            </Paragraph>

            <AangevraagdVerleendVastgesteld />

            <Soort />

            <VerleendPerThema />

            <RegisterGebruikInfo />
          </div>
        </Column>
        <Column span={3}>
          <MetaInformation>Bijgewerkt tot: 01-01-2022</MetaInformation>
        </Column>
      </Row>
    </PageTemplate>
  );
};

export default Feiten;
