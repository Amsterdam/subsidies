import { useState } from "react";
import { Table, TableCell, TableBody, TableHeader, TableRow } from "@amsterdam/asc-ui";

import { useSubsidieContext } from "../DataProvider";
import PageTemplate from "../PageTemplate";

// TODO: Move this function to a file
function filter(filters, data) {
  return data;
}

const Lijst = () => {
  // TODO: Maybe move this hook to the filter function? Maybe make that function a hook?
  const { data, isLoading } = useSubsidieContext();
  // TODO: Define the correct type for the filters object
  const [filters, setFilters] = useState({});
  const [numberOfItems, setNumberOfItems] = useState(25);

  const filteredData = filter(filters, data).splice(0, numberOfItems)

  console.log("D", filteredData);

  return (
    <PageTemplate>
      <div>Lijst test</div>
      {!isLoading && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell as="th">Project en naam</TableCell>
              <TableCell as="th">Regeling en organisatie</TableCell>
              <TableCell as="th">Thema</TableCell>
              <TableCell as="th">Jaar</TableCell>
              <TableCell as="th">Soort</TableCell>
              <TableCell as="th">Aangevraagd</TableCell>
              <TableCell as="th">Verleend</TableCell>
              <TableCell as="th">Vastgesteld</TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredData.map((d) => (
              <TableRow key={d.DOSSIERNUMMER}>
                <TableCell>
                  <b>{d.PROJECT_NAAM}</b>
                  <br />
                  {d.AANVRAGER}
                </TableCell>
                <TableCell>
                  {d.REGELINGNAAM}
                  <br />
                  {d.ORGANISATIEONDERDEEL}
                </TableCell>
                <TableCell>{d.BELEIDSTERREIN}</TableCell>
                <TableCell>{d.SUBSIDIEJAAR}</TableCell>
                <TableCell>{d.TYPE_PERIODICITEIT}</TableCell>
                <TableCell>{d.BEDRAG_AANGEVRAAGD}</TableCell>
                <TableCell>{d.BEDRAG_VERLEEND}</TableCell>
                <TableCell>{d.BEDRAG_VASTGESTELD}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </PageTemplate>
  );
};

export default Lijst;
