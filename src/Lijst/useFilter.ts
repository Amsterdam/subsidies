import { useMemo } from "react";
import { Filter, Subisidie } from "../types";

function useFilter(filters: Filter, data: Subisidie[]) {
  return useMemo(() => {
    // First filter by year to reduce the amount of data we need to work with.
    let filteredData = data.filter((d) => d.SUBSIDIEJAAR === filters.jaar);

    if (filters.minimaal && filters.minimaal > 0) {
      filteredData = filteredData.filter((d) => d.BEDRAG_VERLEEND > (filters.minimaal || 0));
    }

    if (filters.maximaal && filters?.maximaal > 0) {
      filteredData = filteredData.filter((d) => d.BEDRAG_VERLEEND < (filters.maximaal || 0));
    }

    if (filters.periodiciteit) {
      filteredData = filteredData.filter((d) => {
        return d.TYPE_PERIODICITEIT === filters.periodiciteit;
      });
    }

    if (filters.themas && filters.themas.length > 0) {
      filteredData = filteredData.filter((d) => filters.themas?.includes(d.BELEIDSTERREIN));
    }

    if (filters.organisations && filters.organisations.length > 0) {
      filteredData = filteredData.filter((d) => filters.organisations?.includes(d.ORGANISATIEONDERDEEL));
    }

    if (filters.zoeken) {
      filteredData = filteredData.filter(
        (d) =>
          d.PROJECT_NAAM.toLocaleLowerCase().includes(filters.zoeken?.toLocaleLowerCase() || "") ||
          d.REGELINGNAAM.toLocaleLowerCase().includes(filters.zoeken?.toLocaleLowerCase() || "") ||
          d.AANVRAGER.toLocaleLowerCase().includes(filters.zoeken?.toLocaleLowerCase() || ""),
      );
    }

    return filteredData;
  }, [filters, data]);
}

export default useFilter;
