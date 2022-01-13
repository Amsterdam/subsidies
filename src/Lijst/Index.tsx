import { useEffect, useCallback, useState } from "react";
import styled from "styled-components";
import {
  Heading,
  Link,
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
import { Subisidie } from "../types";

// TODO: Move this function to a file
function filter(filters, data) {
  return data;
}

const StyledRight = styled.div`
  float: right;
  text-align: right;

  span {
    color: ${themeColor("tint", "level5")};
  }
`;

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
  const numberOfItems = 50;
  // TODO: Maybe move this hook to the filter function? Maybe make that function a hook?
  const { data, isLoading } = useSubsidieContext();
  // TODO: Define the correct type for the filters object
  const [filters, setFilters] = useState({});
  const [items, setItems] = useState<Subisidie[]>([]);

  useEffect(() => {
    onPageChange(1);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onPageChange = useCallback(
    (page: number) => {
      const offset: number = (page - 1) * numberOfItems;
      setItems(filter(filters, data).slice(offset, offset + numberOfItems));
    },
    [data, filters],
  );

  const renderDate = useCallback((date: string) => {
    const newDate = new Date(date);
    return <span>Bijgewerkt tot {`${newDate.getDate()}-${newDate.getMonth() + 1}-${newDate.getFullYear()}`}</span>;
  }, []);

  return (
    <PageTemplate>
      {!isLoading && (
        <>
          <StyledRight>
            {renderDate(items[0].DATUM_OVERZICHT)}
            <br />
            <Link href="/" variant="inline">
              Download subsidieregister
            </Link>
          </StyledRight>

          <Heading as="h1">Lijst</Heading>

          <div>{data.length} resultaten</div>

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
