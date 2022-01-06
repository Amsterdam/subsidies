import { useEffect, useState } from "react";
import Chart from "./Chart";
import horizontalBarChartSpec from "./horizontalBarVegaSpec";
import { useSubsidieContext } from "../DataProvider";

const VerleendPerThemaChart = ({ jaar = "2020" }) => {
  const { data, isLoading } = useSubsidieContext();

  const [values, setValues] = useState<{ label: string; waarde: number }[]>([]);

  useEffect(() => {
    if (!isLoading) {
      const yearData = data.filter((d) => d.SUBSIDIEJAAR === jaar);

      const res = yearData.reduce<Record<string, number>>((prev, curr) => {
        if (prev[curr.BELEIDSTERREIN]) {
          prev[curr.BELEIDSTERREIN] += curr.BEDRAG_VERLEEND;
        } else {
          prev[curr.BELEIDSTERREIN] = curr.BEDRAG_VERLEEND;
        }

        return prev;
      }, {});

      const values = Object.keys(res).map((label) => ({
        label,
        waarde: Math.round(res[label]),
      }));

      setValues(values);
    }
  }, [isLoading, jaar, data]);

  return <Chart values={values} vegaSpec={horizontalBarChartSpec} />;
};

export default VerleendPerThemaChart;
