import { useEffect, useState } from "react";
import { useSubsidieContext } from "../DataProvider";

const useGetDistinctYears = () => {
  const [years, setYears] = useState<string[]>([]);
  const { data } = useSubsidieContext();

  useEffect(() => {
    console.log("useGetDistinctYears useEffect");

    const years: string[] = [];

    data.forEach((d) => {
      if (!years.includes(d.SUBSIDIEJAAR)) {
        years.push(d.SUBSIDIEJAAR);
      }
    });

    setYears(years);
  }, [data]);

  return years;
};

export default useGetDistinctYears;
