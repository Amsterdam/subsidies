import { List, ListItem } from "@amsterdam/asc-ui";

const RegisterGebruikInfo = () => {
  return (
    <>
      <h2>Uitgangspunten voor een juist gebruik van het register</h2>
      <List variant="bullet">
        <ListItem>
          Nog niet alle subsidies worden verstrekt via het gemeentelijke subsidiebeheersysteem; de navolgende subsidies
          zitten dan ook niet in het openbaar subsidieregister:
          <List variant="bullet">
            <ListItem>Huisvestingsvoorzieningen Amsterdam Onderwijs 2016;</ListItem>
            <ListItem>Subsidies voor drinkwaterinstallaties;</ListItem>
            <ListItem>Erfpachtsubsidies;</ListItem>
            <ListItem>Subsidies voor gevelsanering tegen verkeerslawaai;</ListItem>
            <ListItem>Subsidies voor lang parkeren;</ListItem>
            <ListItem>Loonkostensubsidies.</ListItem>
          </List>
        </ListItem>
        <ListItem>
          Op advies van de Commissie Privacy Amsterdam zijn de namen van particuliere subsidieontvangers weggehaald.
        </ListItem>
        <ListItem>
          Op advies van de directie Openbare Orde en Veiligheid worden de namen van organisaties waarvan de veiligheid
          van deze organisaties en/of hun werknemers en/of bezoekers in gevaar zouden kunnen komen, niet vermeld in het
          subsidieregister. Vooralsnog geldt deze maatregel alleen voor de subsidieregeling bijdrage beveiliging
          bedreigde religieuze en maatschappelijke instellingen.
        </ListItem>
        <ListItem>
          De in het register getoonde kolom Project bevat een door de aanvrager ingevoerde projectomschrijving.
        </ListItem>
        <ListItem>
          Het overnemen en gebruiken van gegevens is met de volgende bronvermelding toegestaan: Gemeente
          Amsterdam/Openbaar subsidieregister.
        </ListItem>
        <ListItem>
          De inhoud van dit openbaar subsidieregister is met uiterste zorgvuldigheid tot stand gebracht. De inhoud wordt
          regelmatig gecontroleerd en geactualiseerd. De gemeente Amsterdam kan echter niet aansprakelijk worden gesteld
          voor de juistheid, volledigheid en actualiteit van het openbaar subsidieregister. De gemeente Amsterdam kan in
          het bijzonder niet aansprakelijk worden gesteld voor eventuele schade of consequenties ontstaan door direct of
          indirect gebruik van de inhoud van het openbaar subsidieregister.
        </ListItem>
      </List>
    </>
  );
};

export default RegisterGebruikInfo;
