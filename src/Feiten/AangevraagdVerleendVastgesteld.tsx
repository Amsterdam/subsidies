import { List, ListItem } from "@amsterdam/asc-ui";

const AangevraagdVerleendVastgesteld = () => {
  return (
    <>
      <h2>Aangevraagd, verleend en vastgesteld</h2>
      <List variant="bullet">
        <ListItem>Aangevraagd: het bij de gemeente aangevraagde subsidiebedrag</ListItem>
        <ListItem>Verleend: het door de gemeente daadwerkelijk verleende subsidiebedrag</ListItem>
        <ListItem>
          Vastgesteld: de hoogte van het definitieve subsidiebedrag na verantwoording over de uitvoering van de
          gesubsidieerde activiteiten
        </ListItem>
      </List>
    </>
  );
};

export default AangevraagdVerleendVastgesteld;
