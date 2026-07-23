import React, { useState, useMemo } from 'react';

// 포켓몬 대표 이미지가 매칭된 상설 동아리 데이터
const clubData = [
  { 
    id: 1, 
    name: '경영마케팅부(PMC)', 
    teacher: '이은빈', 
    target: '1, 2, 3학년', 
    interview: '유', 
    desc: '경영과 마케팅을 연구하고, 체험하는 활동 진행',
    pokemonImg: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/52.png'
  },
  { 
    id: 2, 
    name: '그린나래', 
    teacher: '이형준', 
    target: '1, 2, 3학년', 
    interview: '유', 
    desc: '연극 공연 제작 및 대회 참여 등 다양한 활동 진행',
    pokemonImg: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/39.png'
  },
  { 
    id: 3, 
    name: '글하다', 
    teacher: '장승진', 
    target: '1, 2, 3학년', 
    interview: '유', 
    desc: '시, 소설 등 문학 작품 창작, 작품 공유, 문집 발간(특강, 영화 관람, 독서 토론 등도 실시)',
    pokemonImg: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/199.png'
  },
  { 
    id: 4, 
    name: '또래상담아미티', 
    teacher: '김태곤', 
    target: '1, 2, 3학년', 
    interview: '유', 
    desc: '또래상담, 학교폭력예방 캠페인, wee클래스 행사 진행 등 다양한 상담, 심리교육 및 활동',
    pokemonImg: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/113.png'
  },
  { 
    id: 5, 
    name: '라이온즈', 
    teacher: '서효훈', 
    target: '1, 2, 3학년', 
    interview: '유', 
    desc: '축구 기량 향상 및 성남시 스포츠클럽 축제 등 대회 출전-주말스포츠클럽',
    pokemonImg: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/813.png'
  },
  { 
    id: 6, 
    name: '로그인', 
    teacher: '이석영', 
    target: '1, 2, 3학년', 
    interview: '유', 
    desc: '인공지능, 소프트웨어 교육, 4차산업 로봇연구 IOT실습, 아두이노 수업, 외부 프로그램 및 봉사활동',
    pokemonImg: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/137.png'
  },
  { 
    id: 7, 
    name: '르베르', 
    teacher: '박상진', 
    target: '1, 2, 3학년', 
    interview: '유', 
    desc: '패션 디자인 계열 학과 진학을 위해 이론 및 다양한 실습 활동',
    pokemonImg: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/573.png'
  },
  { 
    id: 8, 
    name: '리더의 챌린지', 
    teacher: '김종연', 
    target: '1, 2, 3학년', 
    interview: '유', 
    desc: '책 읽고 다양한 지적 탐구활동 및 도서관 봉사활동',
    pokemonImg: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/65.png'
  },
  { 
    id: 9, 
    name: '문화공감', 
    teacher: '안은지', 
    target: '3학년', 
    interview: '유', 
    desc: '사회학적 상상력을 바탕으로 한 현상 재해석 및 사회적 가치 공유 활동',
    pokemonImg: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/176.png'
  },
  { 
    id: 10, 
    name: '바이오스', 
    teacher: '이연정', 
    target: '1, 2, 3학년', 
    interview: '유', 
    desc: '생명과학 주제 과제 연구, 환경활동, 과학독서활동 등 다양한 활동 진행',
    pokemonImg: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png'
  },
  { 
    id: 11, 
    name: '방송반', 
    teacher: '구종화', 
    target: '1, 2, 3학년', 
    interview: '유', 
    desc: '학교행사 준비 및 교내 음악방송',
    pokemonImg: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/293.png'
  },
  { 
    id: 12, 
    name: '배드민턴', 
    teacher: '정병훈', 
    target: '1, 2, 3학년', 
    interview: '유', 
    desc: '배드민턴 훈련 및 성남시 스포츠클럽 축제 등 대회 출전-토요스포츠클럽',
    pokemonImg: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png'
  },
  { 
    id: 13, 
    name: '수학사랑', 
    teacher: '김세식', 
    target: '1, 2, 3학년', 
    interview: '유', 
    desc: '개인별 수학 심화주제 탐구, 수학프로그램 탐구, 수학체험활동',
    pokemonImg: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/201.png'
  },
  { 
    id: 14, 
    name: '아고라', 
    teacher: '김민주', 
    target: '1, 2, 3학년', 
    interview: '유', 
    desc: '시사 문제 토론 활동 및 독서 디베이트',
    pokemonImg: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/54.png'
  },
  { 
    id: 15, 
    name: '알키미아', 
    teacher: '이서은', 
    target: '1, 2, 3학년', 
    interview: '유', 
    desc: '화학 관련 과제연구, 과학독서 활동, 화학 실험 활동, 봉사 활동',
    pokemonImg: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/88.png'
  },
  { 
    id: 16, 
    name: '오페니언', 
    teacher: '김찬영', 
    target: '1, 2학년', 
    interview: '유', 
    desc: '사제 동행 독서 토론 및 인문학 산책 등 다양한 행사 진행, 역사영화 시청',
    pokemonImg: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/175.png'
  },
  { 
    id: 17, 
    name: '지오네틱스', 
    teacher: '최선결', 
    target: '1, 2, 3학년', 
    interview: '유', 
    desc: '지구과학 탐구 활동(천체 관측, 지질 탐사 등), 기후변화 캠페인 활동',
    pokemonImg: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/338.png'
  },
  { 
    id: 18, 
    name: '종이 위 과학', 
    teacher: '강주애', 
    target: '1, 2, 3학년', 
    interview: '유', 
    desc: '과학 독서, 사이언스 북-큐레이션, 에세이 작성 활동',
    pokemonImg: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/322.png'
  },
  { 
    id: 19, 
    name: '진로길찾기', 
    teacher: '허지혜', 
    target: '3학년', 
    interview: '유', 
    desc: '진로 탐색 및 학과 대학 정보 탐색 활동 진행',
    pokemonImg: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/808.png'
  },
  { 
    id: 20, 
    name: '코딩클래스', 
    teacher: '이진용', 
    target: '1, 2, 3학년', 
    interview: '유', 
    desc: '한국외대 대학생 강사진 1:1 맞춤형 코딩 교육(웹/앱 개발, 파이썬, 알고리즘)',
    pokemonImg: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/479.png'
  },
  { 
    id: 21, 
    name: '탭(실용무용댄스반)', 
    teacher: '김상길', 
    target: '1, 2, 3학년', 
    interview: '유', 
    desc: '브레이킹, 팝핑, 락킹, 왁킹 등 다양한 스타일 댄스 공연 제작',
    pokemonImg: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/236.png'
  },
  { 
    id: 22, 
    name: '팝송기타반', 
    teacher: '정연훈', 
    target: '1, 2, 3학년', 
    interview: '유', 
    desc: '통기타 강습, 팝송 배우기, 합주 연습 및 버스킹 공연',
    pokemonImg: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/811.png'
  },
  { 
    id: 23, 
    name: '프린시피아', 
    teacher: '임정민', 
    target: '1, 2, 3학년', 
    interview: '유', 
    desc: '물리학 관련 분야 탐구, 과학 기사 조사 및 분석',
    pokemonImg: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/100.png'
  },
  { 
    id: 24, 
    name: 'RCY', 
    teacher: '김무곤', 
    target: '1, 2, 3학년', 
    interview: '유', 
    desc: '봉사활동 기획 및 교내외 봉사활동 운영',
    pokemonImg: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/176.png'
  },
  { 
    id: 25, 
    name: '국제교류반(Peace Palette)', 
    teacher: '박기현', 
    target: '1, 2학년', 
    interview: '유', 
    desc: '외국학교와의 국제교류활동을 통해 세계시민역량 강화',
    pokemonImg: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/327.png'
  },
  { 
    id: 26, 
    name: '학교텃밭생태체험반', 
    teacher: '선주영', 
    target: '1, 2학년', 
    interview: '무', 
    desc: '씨앗 심기부터 수확까지 직접 체험하며 생태 이해와 책임감을 기르는 동아리',
    pokemonImg: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/152.png'
  }
];

// 동아리 소개글 바탕으로 고유한 FAQ 질문/답변 생성 함수
const getCustomFAQ = (club) => {
  if (!club) return [];

  const gradeText = club.target;
  const teacherText = club.teacher;
  const isInterview = club.interview === '유';

  // 동아리 특성에 따른 질문 세트 생성
  const customQuestions = [
    {
      q: `Q. [${club.name}]에서는 주로 어떤 주요 활동을 진행하나요?`,
      a: `A. 저희 동아리는 "${club.desc}"에 초점을 맞추어 정기적인 활동 및 프로젝트를 진행하고 있습니다.`
    },
    {
      q: `Q. 신입 부원 선발 시 면접 절차가 어떻게 되나요?`,
      a: isInterview 
        ? `A. 면접이 진행되는 동아리입니다. ${teacherText} 선생님 및 기존 부원들과 함께 지원 동기와 동아리 활동 의지를 중심으로 편안한 분위기에서 이야기를 나누게 됩니다.` 
        : `A. 별도의 면접 없이 신청 순서 및 서류 지원을 바탕으로 선발합니다.`
    },
    {
      q: `Q. 몇 학년부터 참여가 가능한가요?`,
      a: `A. 현재 모집 대상은 [${gradeText}]입니다. 관심 있는 학생분들의 많은 지원 바랍니다.`
    }
  ];

  // 특수 분야별 세번째 추가 질문
  if (club.name.includes('코딩') || club.name.includes('로그인')) {
    customQuestions.push({
      q: `Q. 코딩이나 컴퓨터를 잘 못해도 지원할 수 있나요?`,
      a: `A. 네! 기초부터 배우면서 함께 실습 프로젝트를 진행하기 때문에 열정만 있다면 초보자도 환영합니다.`
    });
  } else if (club.name.includes('배드민턴') || club.name.includes('라이온즈') || club.name.includes('탭')) {
    customQuestions.push({
      q: `Q. 개인 준비물이나 실기 테스트가 따로 필요한가요?`,
      a: `A. 동아리 활동 시 필요한 기본 장비나 개인 연습복 정도만 준비해주시면 되며, 즐겁게 참여하는 마음가짐이 가장 중요합니다!`
    });
  } else if (club.name.includes('국제교류')) {
    customQuestions.push({
      q: `Q. 외국어를 매우 잘해야 참여할 수 있나요?`,
      a: `A. 언어 능력보다는 문화적 소통 능력과 열정이 우선입니다. 외국 학교 학생들과 소통하며 함께 언어 실력도 키울 수 있습니다.`
    });
  }

  return customQuestions;
};

export default function ClubList() {
  const [selectedClub, setSelectedClub] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState('전체');

  // [수정 포인트 1] 필터링 조건 완전 수정 (1학년, 2학년, 3학년 모두 정확히 검출)
  const filteredAndSortedClubs = useMemo(() => {
    return clubData
      .filter((club) => {
        if (selectedGrade === '전체') return true;
        // '1학년' -> '1', '2학년' -> '2' 숫자만 추출하여 대상 타겟 문자열 포함 여부 체크
        const gradeNum = selectedGrade.replace('학년', '').trim();
        return club.target.includes(gradeNum);
      })
      .sort((a, b) => a.name.localeCompare(b.name, 'ko'));
  }, [selectedGrade]);

  return (
    <div style={styles.container}>
      <style>{`
        @media (max-width: 768px) {
          .top-header {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 16px !important;
          }
          .title-area {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 6px !important;
          }
          .card-body {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .image-box {
            width: 100% !important;
            height: 140px !important;
          }
          .faq-button {
            width: 100% !important;
            margin-top: 8px !important;
          }
          .info-meta {
            display: flex !important;
            flex-direction: column !important;
            gap: 4px !important;
          }
          .info-meta span {
            margin-left: 0 !important;
          }
        }
      `}</style>

      <div style={styles.contentWrapper}>
        {/* 상단 헤더 영역 */}
        <div className="top-header" style={styles.topHeader}>
          <div className="title-area" style={styles.titleArea}>
            <h1 style={styles.pageTitle}>모집/지원</h1>
            <span style={styles.subTitle}>원하는 동아리 소개글을 확인하고 관심있는 동아리에 지원하세요</span>
          </div>

          <div style={styles.actionButtonGroup}>
            <button 
              style={styles.addClubButton} 
              onClick={() => setIsAddModalOpen(true)}
            >
              동아리 모집 &nbsp;+
            </button>

            <div style={{ position: 'relative' }}>
              <button 
                style={styles.filterButton} 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                필터 &nbsp;≡
              </button>

              {isFilterOpen && (
                <div style={styles.filterDropdown}>
                  {['전체', '1학년', '2학년', '3학년'].map((grade) => (
                    <div
                      key={grade}
                      style={{
                        ...styles.filterOption,
                        backgroundColor: selectedGrade === grade ? '#EEF5DB' : 'transparent',
                        fontWeight: selectedGrade === grade ? 'bold' : 'normal',
                      }}
                      onClick={() => {
                        setSelectedGrade(grade);
                        setIsFilterOpen(false);
                      }}
                    >
                      {grade}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 동아리 카드 목록 영역 */}
        <main style={styles.mainContent}>
          {filteredAndSortedClubs.map((club) => (
            <div key={club.id} style={styles.card}>
              <h2 style={styles.cardTitle}>{club.name}</h2>
              
              {/* [수정 포인트 2] cardBody에 align-items: center를 주어 버튼 포함 전 요소가 정중앙에 수평 배열되도록 처리 */}
              <div className="card-body" style={styles.cardBody}>
                <div className="image-box" style={styles.imageBox}>
                  <img 
                    src={club.pokemonImg} 
                    alt={`${club.name} 포켓몬`} 
                    style={styles.pokemonImage} 
                  />
                </div>

                <div style={styles.infoBox}>
                  <p style={styles.infoText}>
                    <strong>동아리 소개글:</strong> {club.desc}
                  </p>
                  <div className="info-meta" style={styles.infoMeta}>
                    <span><strong>모집 대상 :</strong> {club.target}</span>
                    <span style={{ marginLeft: '24px' }}><strong>면접 여부:</strong> {club.interview}</span>
                    <span style={{ marginLeft: '24px' }}><strong>담당 교사:</strong> {club.teacher}</span>
                  </div>
                </div>

                {/* 정중앙에 정렬되는 자주 묻는 질문 버튼 */}
                <button 
                  className="faq-button"
                  style={styles.faqButton} 
                  onClick={() => setSelectedClub(club)}
                >
                  자주 묻는 질문
                </button>
              </div>
            </div>
          ))}
        </main>
      </div>

      {/* [수정 포인트 3] 동아리별 고유 FAQ가 출력되는 모달 창 */}
      {selectedClub && (
        <div style={styles.modalOverlay} onClick={() => setSelectedClub(null)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 style={styles.modalTitle}>[{selectedClub.name}] 자주 묻는 질문</h3>
            <div style={styles.modalBody}>
              {getCustomFAQ(selectedClub).map((faq, index) => (
                <div key={index} style={{ marginBottom: '16px' }}>
                  <p style={{ fontWeight: 'bold', color: '#111', margin: '0 0 4px 0' }}>{faq.q}</p>
                  <p style={{ margin: 0, color: '#444' }}>{faq.a}</p>
                </div>
              ))}
            </div>
            <button style={styles.closeButton} onClick={() => setSelectedClub(null)}>
              닫기
            </button>
          </div>
        </div>
      )}

      {/* 동아리 모집 + 모달 */}
      {isAddModalOpen && (
        <div style={styles.modalOverlay} onClick={() => setIsAddModalOpen(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 style={styles.modalTitle}>신규 동아리 모집 신청</h3>
            <div style={styles.formGroup}>
              <label style={styles.label}>동아리명</label>
              <input type="text" placeholder="예: 코딩클래스" style={styles.input} />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>담당 교사</label>
              <input type="text" placeholder="선생님 이름" style={styles.input} />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>동아리 소개글</label>
              <textarea placeholder="활동 내용을 입력하세요" style={{ ...styles.input, height: '80px' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <button style={{ ...styles.closeButton, backgroundColor: '#9CA3AF' }} onClick={() => setIsAddModalOpen(false)}>취소</button>
              <button style={styles.closeButton} onClick={() => { alert('신청되었습니다!'); setIsAddModalOpen(false); }}>등록하기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 스타일 정의
const styles = {
  container: {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#ffffff',
    display: 'flex',
    justifyContent: 'center',
    fontFamily: "'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif",
    boxSizing: 'border-box',
  },
  contentWrapper: {
    width: '100%',
    maxWidth: '1200px',
    display: 'flex',
    flexDirection: 'column',
    padding: '0 clamp(16px, 4vw, 32px)',
    boxSizing: 'border-box',
  },
  topHeader: {
    padding: '30px 0 20px 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '100%',
  },
  titleArea: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '16px',
    flexWrap: 'wrap',
  },
  pageTitle: {
    fontSize: 'clamp(24px, 4vw, 36px)',
    fontWeight: 'bold',
    margin: 0,
    color: '#000000',
  },
  subTitle: {
    fontSize: 'clamp(13px, 1.8vw, 15px)',
    color: '#555555',
  },
  actionButtonGroup: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  },
  addClubButton: {
    backgroundColor: '#2D5A4D',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    padding: '10px 18px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
  },
  filterButton: {
    backgroundColor: '#C5D89D',
    color: '#1a1a1a',
    border: 'none',
    borderRadius: '10px',
    padding: '10px 18px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
  },
  filterDropdown: {
    position: 'absolute',
    top: '45px',
    right: 0,
    backgroundColor: '#ffffff',
    border: '1px solid #E5E7EB',
    borderRadius: '10px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
    width: '120px',
    zIndex: 10,
    overflow: 'hidden',
  },
  filterOption: {
    padding: '10px 16px',
    fontSize: '14px',
    cursor: 'pointer',
    color: '#333333',
  },
  mainContent: {
    flex: 1,
    padding: '10px 0 60px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  card: {
    backgroundColor: '#EEF5DB',
    borderRadius: '16px',
    padding: 'clamp(16px, 3vw, 28px)',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    boxSizing: 'border-box',
  },
  cardTitle: {
    fontSize: 'clamp(18px, 2.5vw, 22px)',
    fontWeight: 'bold',
    margin: 0,
    color: '#111111',
  },
  cardBody: {
    display: 'flex',
    alignItems: 'center', // 세로 정중앙 배치 핵심 설정
    gap: '20px',
  },
  imageBox: {
    width: '120px',
    height: '100px',
    backgroundColor: '#E5E7EB',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    padding: '6px',
    boxSizing: 'border-box',
  },
  pokemonImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  infoBox: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  infoText: {
    margin: 0,
    fontSize: '15px',
    color: '#222222',
    lineHeight: '1.4',
  },
  infoMeta: {
    fontSize: '14px',
    color: '#444444',
  },
  faqButton: {
    backgroundColor: '#2D5A4D',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    padding: '14px 22px',
    fontSize: '15px',
    fontWeight: 'bold',
    cursor: 'pointer',
    flexShrink: 0,
    whiteSpace: 'nowrap',
    alignSelf: 'center', // 카드 바디 내에서 완벽한 정중앙 배치
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '16px',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: '14px',
    padding: '28px',
    width: '500px',
    maxWidth: '100%',
    boxShadow: '0 6px 24px rgba(0,0,0,0.15)',
    boxSizing: 'border-box',
  },
  modalTitle: {
    marginTop: 0,
    color: '#2D5A4D',
    fontSize: '18px',
    borderBottom: '2px solid #EEF5DB',
    paddingBottom: '12px',
  },
  modalBody: {
    margin: '20px 0',
    lineHeight: '1.5',
    color: '#333',
    fontSize: '14px',
    maxHeight: '60vh',
    overflowY: 'auto',
  },
  formGroup: {
    marginBottom: '14px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #CCC',
    fontSize: '14px',
    width: '100%',
    boxSizing: 'border-box',
  },
  closeButton: {
    backgroundColor: '#2D5A4D',
    color: '#fff',
    border: 'none',
    padding: '10px 18px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    float: 'right',
  },
};