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
  console.log("liijst", data);

  // <Table>
  //   <TableHeader>
  //     <TableRow>
  //       <TableCell as="th">One</TableCell>
  //       <TableCell as="th">Two</TableCell>
  //       <TableCell as="th">Three</TableCell>
  //       <TableCell as="th">Four</TableCell>
  //     </TableRow>
  //   </TableHeader>
  //   <TableBody>
  //     <TableRow>
  //       <TableCell>A looooooong text</TableCell>
  //       <TableCell>1</TableCell>
  //       <TableCell>
  //         <Link variant="inline" href="/">
  //           Lorem ipsum dolor sit amet.
  //         </Link>
  //       </TableCell>
  //       <TableCell>2000</TableCell>
  //     </TableRow>
  //     <TableRow>
  //       <TableCell>Foo</TableCell>
  //       <TableCell>1</TableCell>
  //       <TableCell>Baz</TableCell>
  //       <TableCell>2000</TableCell>
  //     </TableRow>
  //   </TableBody>
  // </Table>

  // AANVRAGER: "(Particulier)"
  // BEDRAG_AANGEVRAAGD: 4000
  // BEDRAG_VASTGESTELD: 4000
  // BEDRAG_VERLEEND: 4000
  // BELEIDSTERREIN: "Welzijn en Zorg"
  // DATUM_OVERZICHT: "2022-01-10 01:00:59.190"
  // DOSSIERNUMMER: "SBA-000019"
  // ORGANISATIEONDERDEEL: "stadsdeel Zuid"
  // PROJECT_NAAM: "Jazzclub New Orleans"
  // REGELINGNAAM: "Subsidieregeling Bewonersinitiatieven"
  // SUBSIDIEJAAR: "2016"
  // TABLE_NAME: "SB_MI_SUBSIDIEREGISTER"
  // TYPE_PERIODICITEIT: "Eenmalig"

  const filteredData = filter(filters, data);

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
                  {d.PROJECT_NAAM}
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
