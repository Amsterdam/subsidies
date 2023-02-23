import axios, { AxiosResponse } from "axios";
import { Subisidie } from "../types";

async function readCsv(): Promise<{ titleRow: string[]; dataLines: string[][] }> {
  let response: AxiosResponse<ArrayBuffer> | null = null;
  try {
    response = await axios.get<ArrayBuffer>(
      `${
        process.env.NODE_ENV === "test" ? "http://localhost" : "https://api.data.amsterdam.nl"
      }/dcatd/datasets/yvlbMxqPKn1ULw/purls/1`,
      {
        responseType: "arraybuffer",
      },
    );
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
  // Need to decode using latin1 because source data is in that format.
  const enc = new TextDecoder("latin1");
  const csv: string = response && response.data ? enc.decode(new Int8Array(response.data)) : "";

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

  return (data as string).trim();
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
