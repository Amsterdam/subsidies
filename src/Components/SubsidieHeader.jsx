import styled from "styled-components";
import { Link, matchPath, useLocation } from "react-router-dom";
import { Header, themeSpacing, MenuItem, MenuButton, MenuToggle, breakpoint, MenuInline } from "@amsterdam/asc-ui";

const StyledHeader = styled(Header)`
  width: 100%;
  padding-left: ${themeSpacing(11)};
  padding-right: ${themeSpacing(11)} !important;
`;

const MobileMenu = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;

  @media screen and ${breakpoint("min-width", "tabletS")} {
    display: none;
  }

  & > div {
    position: static;
  }

  & > div > ul {
    width: 100% !important;
    height: 140px;
    padding-top: ${themeSpacing(6)};
  }
`;

const WideOnlyMenu = styled(MenuInline)`
  display: none;

  @media screen and ${breakpoint("min-width", "tabletS")} {
    display: flex;
  }
`;

const SubsidieHeader = () => {
  const location = useLocation();
  return (
    <StyledHeader
      tall={false}
      title="Subsidieregister"
      homeLink="/"
      fullWidth
      css={{ zIndex: 20 }}
      navigation={
        <>
          <MobileMenu>
            <MenuToggle>
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
            </MenuToggle>
          </MobileMenu>

          <WideOnlyMenu>
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
          </WideOnlyMenu>
        </>
      }
    />
  );
};

export default SubsidieHeader;
