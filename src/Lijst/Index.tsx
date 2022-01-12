import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Table,
  TableCell,
  TableBody,
  TableHeader,
  TableRow,
  Pagination,
  themeSpacing,
  themeColor,
} from "@amsterdam/asc-ui";

import { useSubsidieContext } from "../DataProvider";
import PageTemplate from "../PageTemplate";

// TODO: Move this function to a file
function filter(filters, data) {
  return data;
}

const StyledTable = styled(Table)`
  margin-bottom: ${themeSpacing(10)};

  tr:nth-child(even) {
    background-color: ${themeColor("tint", "level2")};
  }

  th {
    border-bottom: 2px solid ${themeColor("tint", "level7")} !important;
  }

  td {
    border-bottom: none !important;
  }
`;

const Lijst = () => {
  const numberOfItems = 10;
  // TODO: Maybe move this hook to the filter function? Maybe make that function a hook?
  const { data, isLoading } = useSubsidieContext();
  // TODO: Define the correct type for the filters object
  const [filters, setFilters] = useState({});
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(filter(filters, data).slice(0, numberOfItems));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onPageChange = (page: number) => {
    const offset: number = (page - 1) * numberOfItems + 1;
    setItems(filter(filters, data).slice(offset, offset + numberOfItems));
  };

  console.log("items", items);

  return (
    <PageTemplate>
      {!isLoading && (
        <>
          <StyledTable>
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
              {items.map((d) => (
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
          </StyledTable>

          <Pagination collectionSize={data.length} pageSize={numberOfItems} page={1} onPageChange={onPageChange} />
        </>
        // onPageChange
      )}
    </PageTemplate>
  );
};

export default Lijst;
