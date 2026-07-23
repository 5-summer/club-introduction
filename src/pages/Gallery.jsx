import styled from "styled-components";

// 1. 임의의 활동 내용과 테스트 사진 URL 데이터
const DUMMY_DATA = [
  {
    id: 1,
    title: "코딩 클래스 7/23 활동 사진 및 내용",
    content:
      "오늘은 React 기초와 styled-components 사용법을 학습했습니다. 다들 집중해서 자신만의 동아리 웹페이지 레이아웃을 작성해 보았습니다!",
    images: [
      "https://picsum.photos/id/1/200/200",
      "https://picsum.photos/id/180/200/200",
    ],
  },
  {
    id: 2,
    title: "코딩 클래스 7/24 활동 사진 및 내용",
    content:
      "map 함수를 이용한 동적 데이터 렌더링 및 더미 데이터를 활용해 UI에 직접 내용을 채워 넣는 실습을 진행했습니다.",
    images: [
      "https://picsum.photos/id/20/200/200",
      "https://picsum.photos/id/60/200/200",
    ],
  },
  {
    id: 3,
    title: "코딩 클래스 7/25 활동 사진 및 내용",
    content:
      "동아리원들과 함께 프로젝트 UI 디자인을 점검하고 피드백을 주고받았습니다. 디자인대로 화면이 아주 잘 구성되고 있네요!",
    images: [
      "https://picsum.photos/id/119/200/200",
      "https://picsum.photos/id/160/200/200",
    ],
  },
];

function Gallery() {
  return (
    <Container>
      {/* 태그 이름을 Header에서 GalleryTitleArea로 바꿔서 헤더와 안 헷갈리게 수정했습니다 */}
      <GalleryTitleArea>
        <TitleBox>
          <Title>갤러리</Title>
          <Description>
            날짜별로 동아리에서 활동한 내용과 사진을 확인해보세요
          </Description>
        </TitleBox>

        <ButtonGroup>
          <WriteButton>활동 내용 작성 +</WriteButton>
          <FilterButton>필터 ☰</FilterButton>
        </ButtonGroup>
      </GalleryTitleArea>

      {/* 더미 데이터를 순회하며 카드 출력 */}
      {DUMMY_DATA.map((item) => (
        <Card key={item.id}>
          <CardInfo>
            <CardTitle>{item.title}</CardTitle>
            <CardText>
              <strong>활동 내용:</strong> {item.content}
            </CardText>
          </CardInfo>

          <ImageContainer>
            {item.images.map((imgUrl, idx) => (
              <ImageBox key={idx} src={imgUrl} alt={`활동 사진 ${idx + 1}`} />
            ))}
          </ImageContainer>
        </Card>
      ))}
    </Container>
  );
}

// ----------------- Style Definition -----------------

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 32px 20px;
`;

const GalleryTitleArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

const TitleBox = styled.div`
  display: flex;
  align-items: baseline;
  gap: 16px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin: 0;
`;

const Description = styled.p`
  color: #666;
  font-size: 14px;
  margin: 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const WriteButton = styled.button`
  background-color: #2b5742;
  color: white;
  padding: 10px 18px;
  border-radius: 20px;
  border: none;
  font-weight: bold;
  cursor: pointer;
`;

const FilterButton = styled.button`
  background-color: #b8d898;
  color: #2b5742;
  padding: 10px 18px;
  border-radius: 20px;
  border: none;
  font-weight: bold;
  cursor: pointer;
`;

const Card = styled.div`
  background: #f1f7e9;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
`;

const CardInfo = styled.div`
  flex: 1;
`;

const CardTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 16px;
`;

const CardText = styled.p`
  font-size: 14px;
  color: #333;
  line-height: 1.6;
  margin: 0;
`;

const ImageContainer = styled.div`
  display: flex;
  gap: 12px;
  flex-shrink: 0;
`;

const ImageBox = styled.img`
  width: 120px;
  height: 100px;
  background-color: #d9d9d9;
  border-radius: 12px;
  object-fit: cover;
`;

export default Gallery;