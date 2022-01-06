import { useEffect, useState } from "react";
import cloneDeep from "lodash/cloneDeep";
import verticalBarChartSpec from "./verticalBarVegaSpec";

import { useSubsidieContext } from "../DataProvider";
import Chart from "./Chart";

const spec = cloneDeep(verticalBarChartSpec);

spec.encoding.x = {
  ...spec.encoding.x,
  sort: {
    field: "waarde",
    op: "max",
    order: "descending",
  },
};

const AangevraagdVerleendVastgesteldChart = ({ jaar = "2020" }) => {
  const { data, isLoading } = useSubsidieContext();

  const [values, setValues] = useState<{ label: string; waarde: number }[]>([]);

  useEffect(() => {
    if (!isLoading) {
      const yearData = data.filter((d) => d.SUBSIDIEJAAR === jaar);

      const res = yearData.reduce<{ aangevraagd: number; verleend: number; vastgesteld: number }>(
        (prev, curr) => {
          return {
            aangevraagd: prev.aangevraagd + curr.BEDRAG_AANGEVRAAGD,
            verleend: prev.verleend + curr.BEDRAG_VERLEEND,
            vastgesteld: prev.vastgesteld + curr.BEDRAG_VASTGESTELD,
          };
        },
        { aangevraagd: 0, verleend: 0, vastgesteld: 0 },
      );

      res.aangevraagd = Math.round(res.aangevraagd);
      res.verleend = Math.round(res.verleend);
      res.vastgesteld = Math.round(res.vastgesteld);

      setValues([
        {
          label: "Aangevraagd",
          waarde: res.aangevraagd,
        },
        {
          label: "Verleend",
          waarde: res.verleend,
        },
        {
          label: "Vastgesteld",
          waarde: res.vastgesteld,
        },
      ]);
    }
  }, [isLoading, jaar, data]);

  return <Chart values={values} vegaSpec={spec} />;
};

export default AangevraagdVerleendVastgesteldChart;
