import { useSubsidieContext } from "../DataProvider";

// Returns the last date the data was updated.
const useGetLatestUpdateDate = () => {
  const { data } = useSubsidieContext();

  return new Date(data?.[0]?.DATUM_OVERZICHT);
};

export default useGetLatestUpdateDate;
