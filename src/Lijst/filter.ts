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

  if (filters.eenmalig || filters.periodiek) {
    filteredData = filteredData.filter((d) => {
      if (filters.eenmalig && filters.periodiek) {
        return true;
      }

      if (filters.eenmalig) {
        return d.TYPE_PERIODICITEIT === "Eenmalig";
      }

      if (filters.periodiek) {
        return d.TYPE_PERIODICITEIT === "Periodiek";
      }
    });
  }

  if (filters.themas && filters.themas.length > 0) {
    filteredData = filteredData.filter((d) => filters.themas.includes(d.BELEIDSTERREIN));
  }

  console.log(`Total after filtering: ${filteredData.length}`);

  return filteredData;
}

export default filter;
