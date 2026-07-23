import { useState } from "react";
import styled from "styled-components";
import Filter from "../components/Filter";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
`;

const SearchBox = styled.div`
  width: 943px;
  height: 68px;
  border: 2px solid #2b5748;
  border-radius: 15px;

  display: flex;
  align-items: center;
  padding: 0 20px;
`;

const SearchInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  font-size: 20px;
`;

const FilterButton = styled.button`
  width: 140px;
  height: 55px;

  margin-top: 40px;
  margin-left: 800px;

  background: #b0d8b3;
  border: none;
  border-radius: 15px;

  font-size: 20px;
  cursor: pointer;
`;

const CardArea = styled.div`
  width: 1124px;
  margin-top: 60px;

  display: flex;
  flex-wrap: wrap;
  gap: 58px 40px;
`;

const ClubCard = styled.div`
  width: 251px;
  height: 322px;

  display: flex;
  flex-direction: column;
`;

const ImageBox = styled.div`
  width: 251px;
  height: 148px;

  background: rgba(0,0,0,0.1);
  border-radius: 30px 30px 0 0;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 15px;
`;

const InfoBox = styled.div`
  width: 251px;
  height: 174px;

  background: #e6f3d3;
  border-radius: 0 0 30px 30px;

  padding: 11px 19px;
  box-sizing: border-box;

  overflow: hidden;

  h3 {
    margin: 0 0 11px 0;
    font-size: 20px;
    font-weight: 500;
  }

  p {
    margin: 0 0 10px 0;
    font-size: 13px;
    line-height: 18px;

    height: 36px;
  }
`;

const TagArea = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  border: 2px solid #2b5748;
  border-radius: 30px;

  padding: 7px 18px;

  font-size: 15px;
  line-height: 18px;

  background: #e6f3d3;

  display: flex;
  align-items: center;
  justify-content: center;

  white-space: nowrap;
`;


const clubs = [
  {
    name:"경영마케팅부",
    category:["문과"],
    detail:["경영"],
    grade:["1,2학년"],
    interview:true,
    description:"경영과 마케팅을 연구하고 체험하는 활동 진행"
  },
  {
    name:"그린나래",
    category:["문과"],
    detail:["문화"],
    grade:["1,2학년"],
    interview:true,
    description:"연극 공연 제작 및 대회 참여 등 다양한 활동 진행"
  },
  {
    name:"글하다",
    category:["문과"],
    detail:["문학"],
    grade:["1,2학년"],
    interview:true,
    description:"문학 작품 창작, 공유, 문집 발간 활동"
  },
  {
    name:"더지리어스",
    category:["문과"],
    detail:["지리"],
    grade:["1,2학년"],
    interview:true,
    description:"지리 답사 및 탐구 활동 진행"
  },
  {
    name:"또래상담아미티",
    category:["문과"],
    detail:["보건"],
    grade:["1,2학년"],
    interview:true,
    description:"또래상담 및 학교폭력 예방 활동"
  },
  {
    name:"라이온즈",
    category:["문과"],
    detail:["체육"],
    grade:["1,2학년"],
    interview:true,
    description:"축구 기량 향상 및 스포츠 활동"
  },
  {
    name:"로그인",
    category:["이과"],
    detail:["IT"],
    grade:["1,2학년"],
    interview:true,
    description:"인공지능, 소프트웨어, IoT 관련 활동"
  },
  {
    name:"르베르",
    category:["문과"],
    detail:["패션"],
    grade:["1,2학년"],
    interview:true,
    description:"패션 디자인 관련 이론 및 실습"
  },
  {
    name:"리더의챌린지",
    category:["문과"],
    detail:["리더십"],
    grade:["1,2학년"],
    interview:true,
    description:"리더십 관련 활동"
  },
  {
    name:"문화공감",
    category:["문과"],
    detail:["사회"],
    grade:["1,2학년"],
    interview:true,
    description:"사회 현상 분석 및 가치 공유 활동"
  },
  {
    name:"바이오스",
    category:["이과"],
    detail:["생명"],
    grade:["1,2학년"],
    interview:true,
    description:"생명과학 연구 및 환경 활동"
  },
  {
    name:"방송반",
    category:["문과"],
    detail:["방송"],
    grade:["1,2학년"],
    interview:true,
    description:"학교 행사 및 음악 방송 활동"
  },
  {
    name:"배드민턴",
    category:["문과"],
    detail:["체육"],
    grade:["1,2학년"],
    interview:true,
    description:"배드민턴 훈련 및 대회 참가"
  },
  {
    name:"수학사랑",
    category:["이과"],
    detail:["수학"],
    grade:["1,2학년"],
    interview:true,
    description:"수학 심화 탐구 및 프로그램 탐구"
  },
  {
    name:"아고라",
    category:["문과"],
    detail:["토론"],
    grade:["1,2학년"],
    interview:true,
    description:"시사 문제 토론 및 독서 활동"
  },
  {
    name:"알키미아",
    category:["이과"],
    detail:["과학"],
    grade:["1,2학년"],
    interview:true,
    description:"화학 실험 및 과학 연구 활동"
  },
  {
    name:"오페니언",
    category:["문과"],
    detail:["인문"],
    grade:["1,2학년"],
    interview:true,
    description:"독서 토론 및 인문학 활동"
  },
  {
    name:"지오네틱스",
    category:["이과"],
    detail:["과학"],
    grade:["1,2학년"],
    interview:true,
    description:"지구과학 탐구 활동"
  },
  {
    name:"종이 위 과학",
    category:["이과"],
    detail:["과학"],
    grade:["1,2학년"],
    interview:true,
    description:"과학 독서 및 탐구 활동"
  },
  {
    name:"진로길찾기",
    category:["문과","이과"],
    detail:["진로"],
    grade:["1,2학년"],
    interview:true,
    description:"진로 탐색 및 대학 정보 탐색"
  },
  {
    name:"코딩클래스",
    category:["이과"],
    detail:["IT"],
    grade:["1,2학년"],
    interview:true,
    description:"웹·앱 개발, 파이썬, 알고리즘 학습"
  },
  {
    name:"실용무용댄스반",
    category:["문과"],
    detail:["예술"],
    grade:["1,2학년"],
    interview:true,
    description:"다양한 스타일의 춤 공연 활동"
  },
  {
    name:"팝송기타반",
    category:["문과"],
    detail:["음악"],
    grade:["1,2학년"],
    interview:true,
    description:"기타 연주 및 공연 활동"
  },
  {
    name:"프린시피아",
    category:["이과"],
    detail:["과학"],
    grade:["1,2학년"],
    interview:true,
    description:"물리 관련 분야 탐구 활동"
  },
  {
    name:"RCY",
    category:["문과"],
    detail:["봉사"],
    grade:["1,2학년"],
    interview:true,
    description:"봉사활동 기획 및 운영"
  },
  {
    name:"국제교류반",
    category:["문과"],
    detail:["국제"],
    grade:["1,2학년"],
    interview:true,
    description:"외국 학교와 국제교류 활동"
  },
  {
    name:"학교텃밭생태체험반",
    category:["이과"],
    detail:["생명"],
    grade:["1,2학년"],
    interview:false,
    description:"씨앗 심기부터 수확까지 생태 체험"
  }
];


function List(){

  const [showFilter,setShowFilter] = useState(false);
  const [search,setSearch] = useState("");

  const filteredClubs = clubs.filter((club)=>{

  const keyword = search
    .replaceAll(" ","")
    .toLowerCase();


  const data = [
    club.name,
    club.description,
    ...club.category,
    ...club.detail,
    ...club.grade,
    club.interview ? "면접" : "비면접"
  ]
  .join("")
  .replaceAll(" ","")
  .toLowerCase();


  return data.includes(keyword);

});

  return(
    <Container>

      <SearchBox>
        <SearchInput
          placeholder="검색..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />
      </SearchBox>


      <FilterButton onClick={()=>setShowFilter(true)}>
        필터
      </FilterButton>


      <CardArea>

        {filteredClubs.map((club)=>(
          <ClubCard key={club.name}>

            <ImageBox>
              사진
            </ImageBox>

            <InfoBox>

              <h3>{club.name}</h3>

              <p>{club.description}</p>

              <TagArea>
                {club.category.map(x=>
                  <Tag key={x}>{x}</Tag>
                )}

                {club.detail.map(x=>
                  <Tag key={x}>{x}</Tag>
                )}

                {club.grade.map(x=>
                  <Tag key={x}>{x}</Tag>
                )}

                <Tag>
                  {club.interview ? "면접" : "비면접"}
                </Tag>

              </TagArea>

            </InfoBox>

          </ClubCard>
        ))}

      </CardArea>


      {
        showFilter &&
        <Filter onClose={()=>setShowFilter(false)}/>
      }


    </Container>
  )
}

export default List;