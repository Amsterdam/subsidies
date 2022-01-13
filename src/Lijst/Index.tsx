import { useCallback, useState } from "react";
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
  Button,
} from "@amsterdam/asc-ui";
import { useSubsidieContext } from "../DataProvider";
import PageTemplate from "../PageTemplate";
import { Filter } from "../types";
import useFilter from "./useFilter";
import FilterModal from "../Components/FilterModal";

const numberOfItems = 50;

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
    vertical-align: top;
  }
`;

const Lijst = () => {
  const { data, isLoading } = useSubsidieContext();

  const [filters, setFilters] = useState<Filter>({
    periodiek: false,
    eenmalig: false,
    jaar: `${new Date().getFullYear() - 1}`,
    themas: [],
  });
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [page, setPage] = useState(1);

  const filteredData = useFilter(filters, data);

  const onPageChange = useCallback((page: number) => {
    setPage(page);

    // Scroll to top on selection of different results page.
    window.scrollTo(0, 0);
  }, []);

  const renderDate = useCallback((date: string) => {
    const newDate = new Date(date);
    return <span>Bijgewerkt tot {`${newDate.getDate()}-${newDate.getMonth() + 1}-${newDate.getFullYear()}`}</span>;
  }, []);

  const offset: number = (page - 1) * numberOfItems;
  const paginatedData = filteredData.slice(offset, offset + numberOfItems);

  return (
    <PageTemplate>
      {!isLoading && (
        <>
          <StyledRight>
            {renderDate(data[0].DATUM_OVERZICHT)}
            <br />
            <Link href="/" variant="inline">
              Download subsidieregister
            </Link>
          </StyledRight>

          <Heading as="h1">Lijst</Heading>

          <Button variant="primary" onClick={() => setShowFilterModal(true)}>
            Filter
          </Button>

          <div>{data.length} resultaten</div>

          <FilterModal
            showModal={showFilterModal}
            setShowModal={setShowFilterModal}
            filters={filters}
            setFilters={setFilters}
          />

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
              {paginatedData.map((d) => (
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
      )}
    </PageTemplate>
  );
};

export default Lijst;
