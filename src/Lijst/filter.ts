import { Filter, Subisidie } from "../types";

// TODO: Move this function to a file
function filter(filters: Filter, data: Subisidie[]) {
  console.log(`Total number of items: ${data.length}`);
  // First filter by year to reduce the amount of data we need to work with.
  let filteredData = data.filter((d) => d.SUBSIDIEJAAR === filters.jaar);

  if (filters.minimaal && filters.minimaal > 0) {
    filteredData = filteredData.filter((d) => d.BEDRAG_VERLEEND > (filters.minimaal || 0));
  }

  if (filters.maximaal && filters?.maximaal > 0) {
    filteredData = filteredData.filter((d) => d.BEDRAG_VERLEEND < (filters.maximaal || 0));
  }

  console.log(`Total after filtering: ${filteredData.length}`);

  return filteredData;
}

export default filter;
