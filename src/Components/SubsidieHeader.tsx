import styled from "styled-components";
import { Link, matchPath, useLocation } from "react-router-dom";
import { Header, themeSpacing, themeColor } from "@amsterdam/asc-ui";

const HeaderLink = styled(Link)`
  color: ${themeColor("tint", "level5")};
  text-decoration: none;
  font-weight: 500;
  height: 100%;
  padding-top: ${themeSpacing(4)};
  margin-right: ${themeSpacing(4)};

  &:last-child {
    margin-right: 0;
  }

  &.selected {
    border-bottom: 4px solid ${themeColor("primary")};
  }
`;

const StyledHeader = styled(Header)`
  width: 100%;
  padding-left: ${themeSpacing(11)};
  padding-right: ${themeSpacing(11)} !important;

  margin-bottom: ${themeSpacing(12)};
`;

const SubsidieHeader = () => {
  const location = useLocation();

  return (
    <StyledHeader
      tall={false}
      title="Subsidieregister"
      homeLink=""
      fullWidth
      css={{ zIndex: 20 }}
      navigation={
        <>
          <HeaderLink to="/" className={!matchPath(location.pathname, "/lijst") ? "selected" : ""}>
            Feiten
          </HeaderLink>
          <HeaderLink to="/lijst" className={matchPath(location.pathname, "/lijst") ? "selected" : ""}>
            Lijst
          </HeaderLink>
        </>
      }
    />
  );
};

export default SubsidieHeader;
