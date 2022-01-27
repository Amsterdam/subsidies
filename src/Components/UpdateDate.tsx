import styled from "styled-components";
import { themeColor } from "@amsterdam/asc-ui";

import useGetLatestUpdateDate from "../Hooks/useGetLatestUpdateDate";

const Span = styled.span`
  color: ${themeColor("tint", "level5")};
`;

const LatestUpdateDate = () => {
  const date = useGetLatestUpdateDate();

  return <Span>Bijgewerkt tot {`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`}</Span>;
};

export default LatestUpdateDate;
