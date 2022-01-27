import { createContext, useContext, useEffect, useState } from "react";
import { Subisidie } from "../types";
import { getSubisidieData } from "./getSubisidieData";

export const SubsidieContext = createContext<{ data: Subisidie[]; isLoading: boolean }>({ data: [], isLoading: true });

export const SubsidieDataProvider = ({ children }) => {
  const [data, setData] = useState<Subisidie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const subidies = await getSubisidieData();

      setData(subidies);
      setIsLoading(false);
    };

    loadData();
  }, []);

  return <SubsidieContext.Provider value={{ data, isLoading }}>{children}</SubsidieContext.Provider>;
};

export const useSubsidieContext = () => {
  return useContext(SubsidieContext);
};
