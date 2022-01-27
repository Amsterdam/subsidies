import useGetDistinctData from "./useGetDistinctData";

const useGetDistinctYears = () => {
  return useGetDistinctData("SUBSIDIEJAAR");
};

export default useGetDistinctYears;
