import { List, ListItem } from "@amsterdam/asc-ui";
import EenmaligPeriodiekChart from "../Components/EenmaligPeriodiekChart";

const Soort = ({ jaar }) => {
  return (
    <>
      <h2>Soort</h2>

      <List variant="bullet">
        <ListItem>
          Eenmalige subsidie: subsidie ten behoeve van de activiteiten van de aanvrager die van bepaalde duur zijn en
          maximaal vier jaar bedragen
        </ListItem>
        <ListItem>
          Periodieke subsidie: een subsidie voor activiteiten van in beginsel onbepaalde duur, die per boekjaar of voor
          een aantal boekjaren aan een aanvrager worden verstrekt met een maximum van vier jaar
        </ListItem>
      </List>

      <EenmaligPeriodiekChart jaar={jaar} />
    </>
  );
};

export default Soort;
