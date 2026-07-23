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

export default function ClubList() {
  const [selectedClub, setSelectedClub] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState('전체');

  const filteredAndSortedClubs = useMemo(() => {
    return clubData
      .filter((club) => {
        if (selectedGrade === '전체') return true;
        return club.target.includes(selectedGrade);
      })
      .sort((a, b) => a.name.localeCompare(b.name, 'ko'));
  }, [selectedGrade]);

  return (
    <div style={styles.container}>
      {/* 반응형 CSS 미디어 쿼리 정의 */}
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

      {/* 데스크톱/태블릿/모바일 가변형 레이아웃 래퍼 */}
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

        {/* 메인 동아리 카드 목록 */}
        <main style={styles.mainContent}>
          {filteredAndSortedClubs.map((club) => (
            <div key={club.id} style={styles.card}>
              <h2 style={styles.cardTitle}>{club.name}</h2>
              
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

      {/* 자주 묻는 질문 모달 */}
      {selectedClub && (
        <div style={styles.modalOverlay} onClick={() => setSelectedClub(null)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 style={styles.modalTitle}>[{selectedClub.name}] 자주 묻는 질문</h3>
            <div style={styles.modalBody}>
              <p><strong>Q. 면접은 어떤 방식으로 진행되나요?</strong></p>
              <p>A. 담당 선생님({selectedClub.teacher} 선생님)과 동아리 부원들이 간단한 개별 면접을 진행합니다.</p>
              <br />
              <p><strong>Q. 모집 대상 학년이 어떻게 되나요?</strong></p>
              <p>A. 본 동아리는 {selectedClub.target} 학생들을 대상으로 모집하고 있습니다.</p>
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

// 스타일
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
    padding: '0 clamp(16px, 4vw, 32px)', // 화면 크기에 따라 패딩 자동 조절
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
    fontSize: 'clamp(24px, 4vw, 36px)', // 화면 크기에 따라 폰트 크기 유동 반응
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
    alignItems: 'center',
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
    padding: '24px',
    width: '450px',
    maxWidth: '100%',
    boxShadow: '0 6px 24px rgba(0,0,0,0.15)',
    boxSizing: 'border-box',
  },
  modalTitle: {
    marginTop: 0,
    color: '#2D5A4D',
    fontSize: '18px',
  },
  modalBody: {
    margin: '16px 0',
    lineHeight: '1.5',
    color: '#333',
    fontSize: '14px',
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
  },
};