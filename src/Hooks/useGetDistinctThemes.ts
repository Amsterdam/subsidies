import useGetDistinctData from "./useGetDistinctData";

const useGetDistinctThemes = () => {
  return useGetDistinctData("BELEIDSTERREIN");
};

export default useGetDistinctThemes;
