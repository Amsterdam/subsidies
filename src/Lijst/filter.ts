import { Filter, Subisidie } from "../types";

// TODO: Move this function to a file
function filter(filters: Filter, data: Subisidie[]) {
  console.log(`Total number of items: ${data.length}`);
  // First filter by year to reduce the amount of data we need to work with.
  const yearData = data.filter((d) => d.SUBSIDIEJAAR === filters.jaar);

  console.log(`Total after filtering: ${yearData.length}`);

  return yearData;
}

export default filter;
