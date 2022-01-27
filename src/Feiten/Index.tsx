import { FormEvent, useState } from "react";
import { Paragraph, Select } from "@amsterdam/asc-ui";

import PageTemplate from "../PageTemplate";
import RegisterGebruikInfo from "./RegisterGebruikInfo";
import AangevraagdVerleendVastgesteld from "./AangevraagdVerleendVastgesteld";
import VerleendPerThema from "./VerleendPerThema";
import Soort from "./Soort";
import useGetDistinctYears from "../Hooks/useGetDistinctYears";
import LatestUpdateDate from "../Components/UpdateDate";
import { StyledRight } from "../Components/StyledTable";
import CenterContent from "../Components/CenterContent";

const Feiten = () => {
  const jaren = useGetDistinctYears();
  const [jaar, setJaar] = useState("2021");

  return (
    <PageTemplate>
      <StyledRight>
        <LatestUpdateDate />
      </StyledRight>

      <CenterContent>
        <h1>Feiten</h1>
        <Paragraph>
          Met het openbaar subsidieregister verbetert Amsterdam de transparantie over de subsidies die de gemeente
          verstrekt. Het register bevat alle door de gemeente Amsterdam behandelde subsidieaanvragen vanaf 2016 die zijn
          verwerkt in het gemeentelijke subsidiebeheersysteem en wordt wekelijks bijgewerkt.
        </Paragraph>

        {jaren && jaren.length > 1 && (
          <div style={{ width: "30%" }}>
            <Select
              id="jaar"
              label="Toon statistieken voor"
              value={jaar}
              onChange={(event: FormEvent<HTMLSelectElement>) => {
                setJaar(event.currentTarget.value);
              }}
            >
              {jaren.map((jaar) => (
                <option key={jaar} value={jaar}>
                  {jaar}
                </option>
              ))}
            </Select>
          </div>
        )}

        <AangevraagdVerleendVastgesteld jaar={jaar} />

        <Soort jaar={jaar} />

        <VerleendPerThema jaar={jaar} />

        <RegisterGebruikInfo />
      </CenterContent>
    </PageTemplate>
  );
};

export default Feiten;
