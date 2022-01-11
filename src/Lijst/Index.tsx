import { useState } from "react";
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

  const filteredData = filter(filters, data);

  return (
    <PageTemplate>
      <div>Lijst test</div>
      {!isLoading && (
        <div>
          {filteredData.map((d) => (
            <p key={d.DOSSIERNUMMER}>
              <span>{d.DOSSIERNUMMER}</span>
              <span>{d.PROJECT_NAAM}</span>
              <span>{d.SUBSIDIEJAAR}</span>
              <span>{d.BEDRAG_VERLEEND}</span>
            </p>
          ))}
        </div>
      )}
    </PageTemplate>
  );
};

export default Lijst;
