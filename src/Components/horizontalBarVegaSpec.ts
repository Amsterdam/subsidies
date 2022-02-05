const spec = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  width: "container",
  height: 500,
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
    x: { field: "waarde", type: "quantitative", title: null, axis: null },
    y: {
      field: "label",
      type: "nominal",
      axis: { labelAngle: 0, ticks: false },
      title: null,
      sort: {
        field: "waarde",
        op: "max",
        order: "descending",
      },
    },
  },
  layer: [
    {
      mark: {
        type: "bar",
        color: "#004699",
        height: 25,
      },
    },
    {
      mark: {
        type: "text",
        align: "left",
        baseline: "middle",
      },
      encoding: {
        text: { field: "waarde", type: "quantitative", format: "$,.0f", formatType: "number" },
      },
    },
  ],
};

export default spec;
