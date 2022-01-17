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
import { Filter, Order } from "../types";
import useFilter from "./useFilter";
import FilterModal from "../Components/FilterModal";
import StylelessButton from "../Components/StylelessButton";

const numberOfItems = 50;

const StyledRight = styled.div`
  float: right;
  text-align: right;

  span {
    color: ${themeColor("tint", "level5")};
  }
`;

const StyledLeft = styled.div`
  display: flex;
  margin-top: ${themeSpacing(10)};
  
  button, div {
    align-self: center;
  }

  div {
    margin-left: ${themeSpacing(6)};
  }
`;

const StyledTable = styled(Table)`
margin-top: ${themeSpacing(3)};
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

const TableCellRight = styled(TableCell)`
  text-align: right;
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
  const [sort, setSort] = useState({
    project: Order.ASC,
  });

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

  // sort the data;
  paginatedData.sort((a, b) => {
    if (sort.project === Order.ASC) {
      return a.PROJECT_NAAM < b.PROJECT_NAAM ? -1 : a.PROJECT_NAAM > b.PROJECT_NAAM ? 1 : 0;
    }

    if (sort.project === Order.DSC) {
      return a.PROJECT_NAAM < b.PROJECT_NAAM ? 1 : a.PROJECT_NAAM > b.PROJECT_NAAM ? -1 : 0;
    }

    return 0;
  });

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
          
          <StyledLeft>
            <Button variant="primary" onClick={() => setShowFilterModal(true)}>
              Filter
            </Button>

            <div>
              {filteredData.length.toLocaleString("nl-NL")} resultaten van totaal {data.length.toLocaleString("nl-NL")}
            </div>
          </StyledLeft>

          <FilterModal
            showModal={showFilterModal}
            setShowModal={setShowFilterModal}
            filters={filters}
            setFilters={setFilters}
          />

          <StyledTable>
            <TableHeader>
              <TableRow>
                <TableCell as="th">
                  <StylelessButton
                    onClick={() => {
                      setSort({ project: sort.project === Order.DSC ? Order.ASC : Order.DSC });
                    }}
                  >
                    Project en naam
                  </StylelessButton>
                </TableCell>
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
                  <TableCellRight>&euro;&nbsp;{d.BEDRAG_AANGEVRAAGD.toLocaleString("nl-NL")}</TableCellRight>
                  <TableCellRight>&euro;&nbsp;{d.BEDRAG_VERLEEND.toLocaleString("nl-NL")}</TableCellRight>
                  <TableCellRight>&euro;&nbsp;{d.BEDRAG_VASTGESTELD.toLocaleString("nl-NL")}</TableCellRight>
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
