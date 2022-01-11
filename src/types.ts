export type Subisidie = {
  TABLE_NAME: string;
  DOSSIERNUMMER: string;
  AANVRAGER: string;
  REGELINGNAAM: string;
  BELEIDSTERREIN: string;
  ORGANISATIEONDERDEEL: string;
  PROJECT_NAAM: string;
  TYPE_PERIODICITEIT: "Periodiek" | "Eenmalig";
  BEDRAG_AANGEVRAAGD: number;
  BEDRAG_VERLEEND: number;
  BEDRAG_VASTGESTELD: number;
  SUBSIDIEJAAR: string;
  DATUM_OVERZICHT: string;
};

export type Filter = {
  zoeken?: string;
  jaar: string;
  minimaal?: number;
  maximaal?: number;
  periodiek?: boolean;
  eenmalig?: boolean;
  themas: string[];
};
