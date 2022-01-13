import { Button } from "@amsterdam/asc-ui";
import { useState } from "react";
import FilterModal from "../Components/FilterModal";
import { useSubsidieContext } from "../DataProvider";
import PageTemplate from "../PageTemplate";
import { Filter } from "../types";
import useFilter from "./useFilter";

const Lijst = () => {
  const { data, isLoading } = useSubsidieContext();

  const [filters, setFilters] = useState<Filter>({
    periodiek: false,
    eenmalig: false,
    jaar: `${new Date().getFullYear() - 1}`,
    themas: [],
  });
  const [showFilterModal, setShowFilterModal] = useState(false);

  const filteredData = useFilter(filters, data);

  return (
    <PageTemplate>
      <div>Lijst test</div>
      <Button variant="primary" onClick={() => setShowFilterModal(true)}>
        Filter
      </Button>
      <FilterModal
        showModal={showFilterModal}
        setShowModal={setShowFilterModal}
        filters={filters}
        setFilters={setFilters}
      />
      {!isLoading && (
        <div>
          {filteredData.map((d) => (
            <p key={d.DOSSIERNUMMER}>
              <span>{d.DOSSIERNUMMER}</span>
              <span>&nbsp;</span>
              <span>{d.PROJECT_NAAM}</span>
              <span>&nbsp;</span>
              <span>{d.SUBSIDIEJAAR}</span>
              <span>&nbsp;</span>
              <span>{d.BEDRAG_VERLEEND}</span>
              <span>&nbsp;</span>
              <span>{d.TYPE_PERIODICITEIT}</span>
              <span>&nbsp;</span>
              <span>{d.BELEIDSTERREIN}</span>
              <span>&nbsp;</span>
              <span>{d.ORGANISATIEONDERDEEL}</span>
            </p>
          ))}
        </div>
      )}
    </PageTemplate>
  );
};

export default Lijst;
