import { useSubsidieContext } from "../DataProvider";

// Returns the last date the data was updated.
const useGetLatestUpdateDate = () => {
  const { data } = useSubsidieContext();

  if (!data || !data[0]) {
    return;
  }

  return new Date(data?.[0]?.DATUM_OVERZICHT?.substring(0, 10));
};

export default useGetLatestUpdateDate;
