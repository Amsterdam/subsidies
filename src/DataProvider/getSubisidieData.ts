import axios, { AxiosResponse } from "axios";
import { Subisidie } from "../types";

async function readCsv(): Promise<{ titleRow: string[]; dataLines: string[][] }> {
  let res: AxiosResponse<string> | null = null;
  try {
    res = await axios.get<string>("https://api.data.amsterdam.nl/dcatd/datasets/yvlbMxqPKn1ULw/purls/72c8_AyB5gvJ4Q");
  } catch (e) {
    console.error(e);
  }

  const csv: string = (res && res.data) || "";

  const lines = csv.trim().split("\r\n");

  const titleRow = lines[0].split(";");

  const effectiveLines = lines.slice(2, lines.length - 3); // First two lines and last two are not datalines.
  const dataLines = effectiveLines.map((line) => line.split(";"));

  return {
    titleRow,
    dataLines,
  };
}

function parseData(field, data) {
  if (field === "BEDRAG_AANGEVRAAGD" || field === "BEDRAG_VASTGESTELD" || field === "BEDRAG_VERLEEND") {
    const number = parseFloat(data);

    return isNaN(number) ? 0 : number;
  }

  return data;
}

export async function getSubisidieData(): Promise<Subisidie[]> {
  const { titleRow, dataLines } = await readCsv();

  const results = dataLines.map((row) => {
    return titleRow.reduce((prev, curr, index) => {
      return {
        ...prev,
        [curr]: parseData(curr, row[index]),
      };
    }, {}) as Subisidie;
  }, []);

  return results;
}
