import styled from "styled-components";
import { Table, TableCell, themeSpacing, themeColor } from "@amsterdam/asc-ui";

export const StyledRight = styled.div`
  float: right;
  text-align: right;

  a {
    padding-top: ${themeSpacing(2)};
  }

  span {
    color: ${themeColor("tint", "level5")};
  }
`;

export const StyledLeft = styled.div`
  display: flex;
  margin-top: ${themeSpacing(12)};

  button,
  div {
    align-self: center;
  }

  div {
    margin-left: ${themeSpacing(6)};
  }
`;

export const StyledTable = styled(Table)`
  margin-top: ${themeSpacing(3)};
  margin-bottom: ${themeSpacing(10)};

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
  text-align: center;
`;
