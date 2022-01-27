import useGetDistinctData from "./useGetDistinctData";

const useGetDistinctOrganisations = () => {
  return useGetDistinctData("ORGANISATIEONDERDEEL");
};

export default useGetDistinctOrganisations;
