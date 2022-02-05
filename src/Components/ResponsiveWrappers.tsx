import styled from "styled-components";
import { breakpoint } from "@amsterdam/asc-ui";

export const DisplayMobileOnly = styled.div`
  display: block;

  @media screen and ${breakpoint("min-width", "tabletS")} {
    display: none;
  }
`;

export const DisplayFromMobile = styled.div`
  display: none;

  @media screen and ${breakpoint("min-width", "tabletS")} {
    display: block;
  }
`;
