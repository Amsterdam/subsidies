import styled from "styled-components";
import { Table, TableCell, themeSpacing, themeColor, breakpoint } from "@amsterdam/asc-ui";

export const StyledRight = styled.div`
  float: right;
  text-align: right;

  a {
    padding-top: ${themeSpacing(2)};
    font-size: 16px;
  }
`;

export const StyledLeft = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${themeSpacing(12)};
  width: 100%;
  padding-top: ${themeSpacing(5)};

  @media screen and ${breakpoint("min-width", "tabletS")} {
    flex-direction: row;
    padding-top: 0px;

    p {
      margin-left: ${themeSpacing(4)};
    }
  }

  div {
    margin-left: ${themeSpacing(6)};
  }
`;

export const StyledTable = styled(Table)`
  margin-top: ${themeSpacing(3)};
  margin-bottom: ${themeSpacing(10)};
  background-color: white;

  tr:nth-child(even) {
    background-color: ${themeColor("tint", "level2")};
  }

  th {
    border-bottom: 2px solid ${themeColor("tint", "level7")} !important;
  }

  td {
    border-bottom: none !important;
    vertical-align: top;
  }
`;

export const TableCellRight = styled(TableCell)`
  text-align: right;
`;

export const NoResults = styled.div`
  margin: ${themeSpacing(15)} 0;
  text-align: center;
`;

export const TableWrapper = styled.div`
  width: 100%;
  overflow: auto;
`;
