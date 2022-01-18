import { Order, Sort, Subisidie } from "../types";

export function sortProjects(sort: Sort) {
  return (a: Subisidie, b: Subisidie) => {
    if (sort.order === Order.ASC) {
      return sortAsc(sort.key, a, b);
    }

    return sortDsc(sort.key, a, b);
  };
}

function sortAsc(key: keyof Subisidie, a: Subisidie, b: Subisidie) {
  return a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
}

function sortDsc(key: keyof Subisidie, a: Subisidie, b: Subisidie) {
  return a[key] < b[key] ? 1 : a[key] > b[key] ? -1 : 0;
}
