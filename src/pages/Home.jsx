import styled from "styled-components";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import pungsaeng from "../assets/pungsaeng.png";

function Home() {
  return (
    <Container>
      <WaterMark src={pungsaeng} alt="풍생고 로고" />

      <Title>
        우리 학교 동아리를 한눈에 만나보세요
      </Title>

      <SubTitle>
        학생들의 다양한 활동과 이야기를 소개합니다
      </SubTitle>

      <MoreButton to="/list">
        자세히 알아보기
        <AiOutlineArrowRight />
      </MoreButton>
    </Container>
  );
}

export default Home;

/* ================= styled-components ================= */

const Container = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 105px);
  background: white;
  overflow: hidden;
`;

const WaterMark = styled.img`
  position: absolute;

  width: 560px;
  height: 560px;

  left: 50%;
  top: 46%;

  transform: translate(-50%, -50%);

  opacity: 0.1;

  user-select: none;
  pointer-events: none;
`;

const Title = styled.h1`
  position: absolute;

  top: 250px;
  left: 50%;

  transform: translateX(-50%);

  width: 1200px;

  margin: 0;

  font-size: 42px;
  font-weight: 700;
  line-height: 1.3;

  text-align: center;

  color: #273338;
`;

const SubTitle = styled.h2`
  position: absolute;

  top: 320px;
  left: 50%;

  transform: translateX(-50%);

  width: 1200px;

  margin: 0;

  font-size: 42px;
  font-weight: 700;
  line-height: 1.3;

  text-align: center;

  color: #273338;
`;

const MoreButton = styled(Link)`
  position: absolute;

  left: 50%;
  top: 430px;

  transform: translateX(-50%);

  width: 360px;
  height: 64px;

  border: 2px solid #618764;
  border-radius: 32px;

  background: #e6f3d3;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  font-size: 28px;
  font-weight: 500;

  color: #2b5748;
  text-decoration: none;

  cursor: pointer;

  transition: 0.2s;

  &:hover {
    background: #d8ebbf;
  }

  svg {
    font-size: 26px;
  }
`;
