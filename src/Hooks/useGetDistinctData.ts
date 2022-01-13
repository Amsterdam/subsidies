import { useEffect, useState } from "react";
import { useSubsidieContext } from "../DataProvider";

const useGetDistinctData = (key: string) => {
  const [distinctData, setDistinctData] = useState<string[]>([]);
  const { data } = useSubsidieContext();

  useEffect(() => {
    const distinctData: string[] = [];

    data.forEach((d) => {
      if (!distinctData.includes(d[key])) {
        distinctData.push(d[key]);
      }
    });

    setDistinctData(distinctData);
  }, [data, key]);

  return distinctData;
};

export default useGetDistinctData;
