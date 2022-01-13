import styled from "styled-components";
import { Link } from "react-router-dom";
import { Header, themeSpacing, themeColor } from "@amsterdam/asc-ui";

const HeaderLink = styled(Link)`
  margin-right: ${themeSpacing(4)};
  color: ${themeColor("tint", "level5")};
  text-decoration: none;
  font-weight: 500;

  &:last-child {
    margin-right: 0;
  }
`;

const StyledHeader = styled(Header)`
  width: 100%;
  padding-left: ${themeSpacing(11)};
  padding-right: ${themeSpacing(11)} !important;

  margin-bottom: ${themeSpacing(12)};
`;

const SubsidieHeader = () => {
  return (
    <StyledHeader
      tall={false}
      title="Subsidieregister"
      homeLink=""
      fullWidth
      css={{ zIndex: 20 }}
      navigation={
        <>
          <HeaderLink to="/">Feiten</HeaderLink>
          <HeaderLink to="/lijst">Lijst</HeaderLink>
        </>
      }
    />
  );
};

export default SubsidieHeader;
