import { AiOutlineArrowLeft } from "react-icons/ai";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const defaultClub = {
  name: "코딩 클래스",
  description:
    "코딩 클래스는 프로그래밍의 기초부터 실제 웹 서비스 개발까지 함께 학습하며 성장하는 동아리입니다.",
  category: ["이과"],
  detail: ["IT"],
  grade: ["1,2학년"],
  interview: true,
};

const codingClassIntroduction =
  "코딩 클래스는 프로그래밍의 기초부터 실제 웹 서비스 개발까지 함께 학습하며 성장하는 동아리입니다. 논리적 사고력을 기르고 자신만의 창의적인 결과물을 만들어내는 것을 목표로 합니다.";

const codingClassStrengths =
  "다양한 팀 프로젝트를 통해 실전 감각을 익힐 수 있고, 선후배 간의 멘토링이 활발하여 초보자도 쉽고 재미있게 코딩을 시작할 수 있습니다. 최신 IT 트렌드를 공유하며 함께 공부하는 열정적인 분위기입니다!";

function Introduce() {
  const { clubName } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const club = state?.club ?? {
    ...defaultClub,
    name: clubName ?? defaultClub.name,
  };
  const isCodingClass = club.name.replaceAll(" ", "") === "코딩클래스";

  const tags = [
    ...club.category,
    ...club.detail,
    ...club.grade,
    club.interview ? "면접" : "비면접",
  ];

  const activityImages = [
    "https://picsum.photos/id/180/300/200",
    "https://picsum.photos/id/20/300/200",
    "https://picsum.photos/id/1/300/200",
  ];

  return (
    <Container>
      <BackButton
        type="button"
        aria-label="목록 페이지로 돌아가기"
        onClick={() => navigate(-1)}
      >
        <AiOutlineArrowLeft aria-hidden="true" />
      </BackButton>

      <TitleSection>
        <MainTitle>{club.name}</MainTitle>
        <TeacherName>
          담당 선생님: {isCodingClass ? "김정아 선생님" : "정보 준비 중"}
        </TeacherName>
      </TitleSection>

      <Section>
        <SectionLabel>동아리 소개</SectionLabel>
        <ContentBox>
          {isCodingClass ? codingClassIntroduction : club.description}
        </ContentBox>
      </Section>

      <Section>
        <SectionLabel>우리 동아리의 장점</SectionLabel>
        <ContentBox>
          {isCodingClass
            ? codingClassStrengths
            : `${club.name}에서 관심 분야를 함께 탐구하고 다양한 활동을 경험할 수 있습니다. 동아리원들과 협력하며 새로운 지식과 경험을 쌓아보세요.`}
        </ContentBox>
      </Section>

      <Section>
        <SectionLabel>동아리의 특징</SectionLabel>
        <TagGroup>
          {tags.map((tag) => (
            <Tag key={tag}># {tag}</Tag>
          ))}
        </TagGroup>
      </Section>

      <Section>
        <SectionLabel>활동 사진</SectionLabel>
        <PhotoGroup>
          {activityImages.map((src, index) => (
            <PhotoBox key={src} src={src} alt={`활동 사진 ${index + 1}`} />
          ))}
        </PhotoGroup>
      </Section>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: "Pretendard", -apple-system, sans-serif;
  text-align: left;
`;

const BackButton = styled.button`
  position: absolute;
  top: 40px;
  left: 20px;
  display: grid;
  width: 48px;
  height: 48px;
  padding: 0;
  color: #2b5748;
  background: #e6f3d3;
  border: 2px solid #2b5748;
  border-radius: 50%;
  place-items: center;
  cursor: pointer;
  transition:
    color 0.2s ease,
    background 0.2s ease,
    transform 0.2s ease;

  &:hover {
    color: #fff;
    background: #2b5748;
    transform: translateX(-3px);
  }

  &:focus-visible {
    outline: 3px solid rgba(97, 135, 100, 0.4);
    outline-offset: 3px;
  }

  svg {
    width: 28px;
    height: 28px;
  }
`;

const TitleSection = styled.div`
  position: relative;
  margin-bottom: 40px;
  text-align: center;
`;

const MainTitle = styled.h1`
  margin-bottom: 8px;
  color: #000;
  font-size: 40px;
  font-weight: 800;
`;

const TeacherName = styled.p`
  margin-right: 20px;
  color: #333;
  font-size: 18px;
  text-align: right;
`;

const Section = styled.section`
  margin-bottom: 30px;
`;

const SectionLabel = styled.h2`
  margin-bottom: 12px;
  color: #000;
  font-size: 20px;
  font-weight: 700;
`;

const ContentBox = styled.div`
  min-height: 80px;
  padding: 24px;
  color: #333;
  font-size: 16px;
  line-height: 1.6;
  background-color: #f1f7e9;
  border: 1.5px solid #2b5742;
  border-radius: 12px;
`;

const TagGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const Tag = styled.span`
  padding: 8px 16px;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  background-color: #2b5742;
  border-radius: 20px;
`;

const PhotoGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
`;

const PhotoBox = styled.img`
  width: 31%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  background-color: #e0e0e0;
  border-radius: 12px;
`;

export default Introduce;
