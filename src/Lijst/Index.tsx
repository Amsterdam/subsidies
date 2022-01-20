import { useCallback, useState } from "react";
import XLSX from "sheetjs-style";
import { Heading, Link, TableCell, TableBody, TableHeader, TableRow, Pagination, Button } from "@amsterdam/asc-ui";
import { Filter, Order, Sort, Subisidie } from "../types";
import FilterModal from "../Components/FilterModal";
import StylelessButton from "../Components/StylelessButton";
import { StyledLeft, StyledRight, StyledTable, TableCellRight } from "../Components/StyledTable";
import { useSubsidieContext } from "../DataProvider";
import PageTemplate from "../PageTemplate";
import { sortProjects } from "./sortProjects";
import useFilter from "./useFilter";

const numberOfItems = 50;

const Lijst = () => {
  const { data, isLoading } = useSubsidieContext();
  const [filters, setFilters] = useState<Filter>({
    jaar: `${new Date().getFullYear() - 1}`,
  });
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<Sort>({
    key: "PROJECT_NAAM",
    order: Order.ASC,
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

  // sort the data;
  filteredData.sort(sortProjects(sort));

  const offset: number = (page - 1) * numberOfItems;
  const paginatedData = filteredData.slice(offset, offset + numberOfItems);

  const setColumnSort = (key: keyof Subisidie) => {
    return setSort({ key, order: sort.order === Order.DSC ? Order.ASC : Order.DSC });
  };

  return (
    <PageTemplate>
      {!isLoading && (
        <>
          <StyledRight>
            {renderDate(data[0].DATUM_OVERZICHT)}
            <br />
            <Link
              onClick={() => {
                const workbook = XLSX.utils.book_new();
                const sheet = XLSX.utils.json_to_sheet(
                  filteredData.map((s) => ({
                    Naam: s.AANVRAGER,
                    Project: s.PROJECT_NAAM,
                    Regeling: s.REGELINGNAAM,
                    Organisatie: s.ORGANISATIEONDERDEEL,
                    Thema: s.BELEIDSTERREIN,
                    Jaar: s.SUBSIDIEJAAR,
                    Periodiciteit: s.TYPE_PERIODICITEIT,
                    Aangevraagd: `€ ${Math.round(s.BEDRAG_AANGEVRAAGD)}`,
                    Verleend: `€ ${Math.round(s.BEDRAG_VERLEEND)}`,
                    Vastgesteld: `€ ${Math.round(s.BEDRAG_VASTGESTELD)}`,
                  })),
                );

                // Update style of header row
                ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"].forEach(
                  (letter) =>
                    (sheet[`${letter}1`].s = {
                      font: {
                        bold: true,
                      },
                    }),
                );

                XLSX.utils.book_append_sheet(workbook, sheet);

                XLSX.writeFile(workbook, "Subsidieregister.xlsx");
                return false;
              }}
              variant="inline"
            >
              Download subsidieregister
            </Link>
          </StyledRight>

          <Heading as="h1">Lijst</Heading>

          <StyledLeft>
            <Button variant="primary" onClick={() => setShowFilterModal(true)}>
              Filters (
              {
                Object.keys(filters)
                  .map((k) => !!filters[k])
                  .filter(Boolean).length
              }
              )
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
                      setColumnSort("PROJECT_NAAM");
                    }}
                  >
                    Project en naam
                  </StylelessButton>
                </TableCell>
                <TableCell as="th">
                  <StylelessButton
                    onClick={() => {
                      setColumnSort("REGELINGNAAM");
                    }}
                  >
                    Regeling en organisatie
                  </StylelessButton>
                </TableCell>
                <TableCell as="th">
                  <StylelessButton
                    onClick={() => {
                      setColumnSort("BELEIDSTERREIN");
                    }}
                  >
                    Thema
                  </StylelessButton>
                </TableCell>
                <TableCell as="th">Jaar</TableCell>
                <TableCell as="th">
                  <StylelessButton
                    onClick={() => {
                      setColumnSort("TYPE_PERIODICITEIT");
                    }}
                  >
                    Soort
                  </StylelessButton>
                </TableCell>
                <TableCell as="th">
                  <StylelessButton
                    onClick={() => {
                      setColumnSort("BEDRAG_AANGEVRAAGD");
                    }}
                  >
                    Aangevraagd
                  </StylelessButton>
                </TableCell>
                <TableCell as="th">
                  <StylelessButton
                    onClick={() => {
                      setColumnSort("BEDRAG_VERLEEND");
                    }}
                  >
                    Verleend
                  </StylelessButton>
                </TableCell>
                <TableCell as="th">
                  <StylelessButton
                    onClick={() => {
                      setColumnSort("BEDRAG_VASTGESTELD");
                    }}
                  >
                    Vastgesteld
                  </StylelessButton>
                </TableCell>
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

          <Pagination
            collectionSize={filteredData.length}
            pageSize={numberOfItems}
            page={1}
            onPageChange={onPageChange}
          />
        </>
      )}
    </PageTemplate>
  );
};

export default Lijst;
