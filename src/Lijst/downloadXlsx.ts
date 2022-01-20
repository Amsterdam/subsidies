import XLSX from "sheetjs-style";

function downloadXlsx(data) {
  const workbook = XLSX.utils.book_new();
  const sheet = XLSX.utils.json_to_sheet(
    data.map((s) => ({
      Naam: s.AANVRAGER,
      Project: s.PROJECT_NAAM,
      Regeling: s.REGELINGNAAM,
      Organisatie: s.ORGANISATIEONDERDEEL,
      Thema: s.BELEIDSTERREIN,
      Jaar: s.SUBSIDIEJAAR,
      Periodiciteit: s.TYPE_PERIODICITEIT,
      Aangevraagd: `€ ${Math.round(s.BEDRAG_AANGEVRAAGD)}`,
      Verleend: `€ ${Math.round(s.BEDRAG_VERLEEND)}`,
      Vastgesteld: `€ ${Math.round(s.BEDRAG_VASTGESTELD)}`,
    })),
  );

  // Update style of header row
  ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"].forEach(
    (letter) =>
      (sheet[`${letter}1`].s = {
        font: {
          bold: true,
        },
      }),
  );

  XLSX.utils.book_append_sheet(workbook, sheet);

  XLSX.writeFile(workbook, "Subsidieregister.xlsx");
  return false;
}

export default downloadXlsx;
