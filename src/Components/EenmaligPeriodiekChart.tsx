import { useEffect, useState } from "react";
import { useSubsidieContext } from "../DataProvider";
import Chart from "./Chart";

const EenmaligPeriodiekChart = ({ jaar = "2020" }) => {
  const { data, isLoading } = useSubsidieContext();

  const [values, setValues] = useState<{ label: string; waarde: number }[]>([]);

  useEffect(() => {
    if (!isLoading) {
      const yearDataEenmalig = data.filter((d) => d.SUBSIDIEJAAR === jaar && d.TYPE_PERIODICITEIT === "Eenmalig");
      const yearDataPeriodiek = data.filter((d) => d.SUBSIDIEJAAR === jaar && d.TYPE_PERIODICITEIT === "Periodiek");

      const eenmalig = Math.round(
        yearDataEenmalig.reduce<number>((prev, curr) => {
          return prev + curr.BEDRAG_VERLEEND;
        }, 0),
      );

      const periodiek = Math.round(
        yearDataPeriodiek.reduce<number>((prev, curr) => {
          return prev + curr.BEDRAG_VERLEEND;
        }, 0),
      );

      setValues([
        {
          label: "Periodiek",
          waarde: periodiek,
        },
        {
          label: "Eenmalig",
          waarde: eenmalig,
        },
      ]);
    }
  }, [isLoading, jaar, data]);

  return <Chart values={values} />;
};

export default EenmaligPeriodiekChart;
