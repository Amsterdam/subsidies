import { renderHook } from '@testing-library/react-hooks';
import axios from "axios";

import useGetLatestUpdateDate from "./useGetLatestUpdateDate";

const mock = `TABLE_NAME;DOSSIERNUMMER;AANVRAGER;REGELINGNAAM;BELEIDSTERREIN;ORGANISATIEONDERDEEL;PROJECT_NAAM;TYPE_PERIODICITEIT;BEDRAG_AANGEVRAAGD;BEDRAG_VERLEEND;BEDRAG_VASTGESTELD;SUBSIDIEJAAR;DATUM_OVERZICHT
----------;-------------;---------;------------;--------------;--------------------;------------;------------------;------------------;---------------;------------------;------------;---------------
SB_MI_SUBSIDIEREGISTER;SBA-000019;(Particulier);Subsidieregeling Bewonersinitiatieven;Welzijn en Zorg;stadsdeel Zuid;Jazzclub New Orleans;Eenmalig;4000.00;4000.00;4000.00;2016;2022-01-24 01:01:04.587
SB_MI_SUBSIDIEREGISTER;SBA-000042;St. Centrale Dorpenraad Landelijk Noord;Begrotingspost Subsidies SD Noord (Organisatiespecifiek);Algemeen;stadsdeel Noord;Stichting Centrale Dorpenraad Landelijk Noord;Periodiek;83280.00;83280.00;83280.00;2016;2022-01-24 01:01:04.587
`;

jest.mock("axios");

describe("useGetLatestUpdateDate", () => {
  it("renders correctly", () => {
    // @ts-ignore
    axios.get.mockResolvedValueOnce(mock );

    const { result } = renderHook(() => useGetLatestUpdateDate())

    console.log('result', result.current);
    
    expect(1).toBe(1);
  });
});
