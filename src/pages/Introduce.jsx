import styled from "styled-components";

function Introduce() {
  // 임의의 사진 URL (테스트용 이미지)
  const activityImages = [
    "https://picsum.photos/id/180/300/200",
    "https://picsum.photos/id/20/300/200",
    "https://picsum.photos/id/1/300/200",
  ];

  return (
    <Container>
      {/* 메인 타이틀과 담당 선생님 */}
      <TitleSection>
        <MainTitle>코딩 클래스</MainTitle>
        <TeacherName>담당 선생님: 김정아 쌤</TeacherName>
      </TitleSection>

      {/* 동아리 소개 */}
      <Section>
        <SectionLabel>동아리 소개</SectionLabel>
        <ContentBox>
          코딩 클래스는 프로그래밍의 기초부터 실제 웹 서비스 개발까지 함께 학습하며 
          성장하는 동아리입니다. 논리적 사고력을 기르고 자신만의 창의적인 결과물을 
          만들어내는 것을 목표로 합니다.
        </ContentBox>
      </Section>

      {/* 우리 동아리의 장점 */}
      <Section>
        <SectionLabel>우리 동아리의 장점</SectionLabel>
        <ContentBox>
          다양한 팀 프로젝트를 통해 실전 감각을 익힐 수 있고, 선후배 간의 멘토링이 
          활발하여 초보자도 쉽고 재미있게 코딩을 시작할 수 있습니다. 
          최신 IT 트렌드를 공유하며 함께 공부하는 열정적인 분위기입니다!
        </ContentBox>
      </Section>

      {/* 동아리의 특징 (태그) */}
      <Section>
        <SectionLabel>동아리의 특징</SectionLabel>
        <TagGroup>
          <Tag># 면접</Tag>
          <Tag># 이과</Tag>
          <Tag># IT</Tag>
        </TagGroup>
      </Section>

      {/* 활동 사진 */}
      <Section>
        <SectionLabel>활동 사진</SectionLabel>
        <PhotoGroup>
          {activityImages.map((src, index) => (
            <PhotoBox key={index} src={src} alt={`활동 사진 ${index + 1}`} />
          ))}
        </PhotoGroup>
      </Section>
    </Container>
  );
}

// ----------------- Style Definition -----------------

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: 'Pretendard', -apple-system, sans-serif;
`;

const TitleSection = styled.div`
  text-align: center;
  margin-bottom: 40px;
  position: relative;
`;

const MainTitle = styled.h1`
  font-size: 40px;
  font-weight: 800;
  color: #000;
  margin-bottom: 8px;
`;

const TeacherName = styled.p`
  font-size: 18px;
  color: #333;
  text-align: right;
  margin-right: 20px;
`;

const Section = styled.div`
  margin-bottom: 30px;
`;

const SectionLabel = styled.h3`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 12px;
  color: #000;
`;

const ContentBox = styled.div`
  background-color: #f1f7e9; /* 연한 연두색 배경 */
  border: 1.5px solid #2b5742; /* 진한 초록색 테두리 */
  border-radius: 12px;
  padding: 24px;
  font-size: 16px;
  line-height: 1.6;
  color: #333;
  min-height: 80px;
`;

const TagGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const Tag = styled.span`
  background-color: #2b5742; /* 태그 배경색 */
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 600;
`;

const PhotoGroup = styled.div`
  display: flex;
  gap: 15px;
  justify-content: space-between;
`;

const PhotoBox = styled.img`
  width: 31%; /* 사진 3개를 나란히 배치 */
  aspect-ratio: 4 / 3;
  background-color: #e0e0e0;
  border-radius: 12px;
  object-fit: cover;
`;

export default Introduce;