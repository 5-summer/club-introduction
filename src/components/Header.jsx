import { NavLink } from "react-router-dom";
import styled from "styled-components";

const HeaderContainer = styled.header`
  width: 100%;
  height: 105px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 48px;
  background-color: var(--green-light);
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  gap: 48px;
`;

const NavigationLink = styled(NavLink)`
  color: var(--green-deep);
  font-size: 30px;
  text-decoration: none;
  transition: color 0.2s ease;

  &.active {
    color: var(--green-dark);
  }

  &:hover {
    color: var(--green-dark);
  }
`;

function Header() {
  return (
    <HeaderContainer>
      <Navigation aria-label="주요 메뉴">
        <NavigationLink to="/" end>
          메인
        </NavigationLink>
        <NavigationLink to="/list">목록</NavigationLink>
        <NavigationLink to="/apply">모집/지원</NavigationLink>
        <NavigationLink to="/gallery">갤러리</NavigationLink>
      </Navigation>
    </HeaderContainer>
  );
}

export default Header;
