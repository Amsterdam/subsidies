const spec = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  width: 500,
  config: {
    axis: {
      labelFontSize: 14,
      labelLimit: 100,
      labelFont: "Avenir Next,Arial,sans-serif",
    },
    view: {
      stroke: "transparent",
    },
  },
  data: {
    values: [],
  },
  encoding: {
    x: { field: "label", type: "nominal", axis: { labelAngle: 0, ticks: false }, title: null },
    y: { field: "waarde", type: "quantitative", title: null, axis: null },
  },
  layer: [
    {
      mark: {
        type: "bar",
        color: "#004699",
        width: 80,
      },
    },
    {
      mark: {
        type: "text",
        align: "center",
        baseline: "bottom",
      },
      encoding: {
        text: { field: "waarde", type: "quantitative", format: "$,.0f", formatType: "number" },
      },
    },
  ],
};

export default spec;
