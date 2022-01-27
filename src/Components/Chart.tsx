import { useEffect, useRef, useState } from "react";
import cloneDeep from "lodash/cloneDeep";
import vegaEmbed from "vega-embed";
import { Spinner } from "@amsterdam/asc-ui";

import verticalBarVegaSpec from "./verticalBarVegaSpec";

const vegaEmbedOptions = {
  actions: false,
};

const VerticalBarChart = ({
  values,
  vegaSpec = verticalBarVegaSpec,
}: {
  values: { label: string; waarde: number }[];
  vegaSpec?: any;
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showError, setShowError] = useState(false);

  async function updateData() {
    setIsLoading(true);
    setShowError(false);

    const chartBase = cloneDeep(vegaSpec);
    chartBase.data.values = values;

    // console.log(JSON.stringify(chartBase));

    if (chartRef.current && chartBase.data.values.length > 0) {
      setIsLoading(false);
      setShowError(false);
      vegaEmbed(chartRef.current, chartBase, vegaEmbedOptions);
    } else {
      setIsLoading(false);
      setShowError(true);
    }
  }

  useEffect(() => {
    if (!values || values.length === 0) {
      return;
    }

    updateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  return (
    <figure>
      <div className="chart-container">
        {isLoading ? <Spinner /> : null}
        {showError && <p>Er ging iets mis met het ophalen van de data.</p>}
        {!showError && <div ref={chartRef}></div>}
      </div>
    </figure>
  );
};

export default VerticalBarChart;
