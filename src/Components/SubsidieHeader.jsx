import styled from "styled-components";
import { Link, matchPath, useLocation } from "react-router-dom";
import { Header, themeSpacing, MenuItem, MenuButton } from "@amsterdam/asc-ui";

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
          <MenuItem>
            <MenuButton as={Link} to="/" active={!matchPath(location.pathname, "/lijst")}>
              Feiten
            </MenuButton>
          </MenuItem>
          <MenuItem>
            <MenuButton as={Link} to="/lijst" active={matchPath(location.pathname, "/lijst")}>
              Lijst
            </MenuButton>
          </MenuItem>
        </>
      }
    />
  );
};

export default SubsidieHeader;
