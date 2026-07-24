import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { isSupabaseConfigured } from '../lib/supabase'
import { getClubs } from '../lib/supabaseApi'

const GRADE_OPTIONS = ['전체', '1학년', '2학년']

function Apply() {
  const [selectedClub, setSelectedClub] = useState(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedGrade, setSelectedGrade] = useState('전체')
  const [clubs, setClubs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setError('Supabase 환경변수가 설정되지 않았습니다.')
      setLoading(false)
      return
    }

    getClubs()
      .then(setClubs)
      .catch((requestError) => {
        console.error('동아리 정보를 불러오지 못했습니다.', requestError)
        setError('동아리 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.')
      })
      .finally(() => setLoading(false))
  }, [])

  const filteredClubs = useMemo(() => {
    return clubs
      .filter((club) => {
        if (selectedGrade === '전체') {
          return true
        }

        const gradeNumber = selectedGrade.replace('학년', '')
        return (club.grade ?? []).some((grade) => grade.includes(gradeNumber))
      })
      .sort((firstClub, secondClub) =>
        firstClub.name.localeCompare(secondClub.name, 'ko'),
      )
  }, [clubs, selectedGrade])

  return (
    <Page>
      <HeaderArea>
        <TitleArea>
          <PageTitle>모집/지원</PageTitle>
          <SubTitle>
            원하는 동아리 소개글을 확인하고 관심 있는 동아리에 지원하세요
          </SubTitle>
        </TitleArea>

        <FilterArea>
          <FilterButton
            type="button"
            aria-expanded={isFilterOpen}
            onClick={() => setIsFilterOpen((current) => !current)}
          >
            {selectedGrade === '전체' ? '학년 필터' : selectedGrade} ▾
          </FilterButton>

          {isFilterOpen && (
            <FilterDropdown>
              {GRADE_OPTIONS.map((grade) => (
                <FilterOption
                  key={grade}
                  type="button"
                  $selected={selectedGrade === grade}
                  onClick={() => {
                    setSelectedGrade(grade)
                    setIsFilterOpen(false)
                  }}
                >
                  {grade}
                </FilterOption>
              ))}
            </FilterDropdown>
          )}
        </FilterArea>
      </HeaderArea>

      {loading && <StateMessage>동아리 정보를 불러오는 중입니다.</StateMessage>}
      {!loading && error && <StateMessage $error>{error}</StateMessage>}
      {!loading && !error && filteredClubs.length === 0 && (
        <StateMessage>
          {clubs.length === 0
            ? '등록된 동아리가 없습니다.'
            : '선택한 학년에 해당하는 동아리가 없습니다.'}
        </StateMessage>
      )}

      {!loading && !error && filteredClubs.length > 0 && (
        <CardList>
          {filteredClubs.map((club) => (
            <Card key={club.id}>
              <CardTitle>{club.name}</CardTitle>
              <CardBody>
                <ImageBox>
                  {club.image_url ? (
                    <ClubImage src={club.image_url} alt={`${club.name} 대표 사진`} />
                  ) : (
                    <ImagePlaceholder>등록된 사진이 없습니다</ImagePlaceholder>
                  )}
                </ImageBox>

                <InfoBox>
                  <Description>
                    <strong>동아리 소개:</strong>{' '}
                    {club.description || '등록된 소개가 없습니다.'}
                  </Description>
                  <Meta>
                    <span>
                      <strong>모집 대상:</strong>{' '}
                      {(club.grade ?? []).join(', ') || '미등록'}
                    </span>
                    <span>
                      <strong>모집 인원:</strong>{' '}
                      {club.recruitment_count ?? 0}명
                    </span>
                    <span>
                      <strong>면접 여부:</strong> {club.interview ? '유' : '무'}
                    </span>
                    <span>
                      <strong>담당 교사:</strong> {club.teacher || '미등록'}
                    </span>
                    <span>
                      <strong>동아리 유형:</strong> {club.type || '미등록'}
                    </span>
                  </Meta>
                </InfoBox>

                <FaqButton type="button" onClick={() => setSelectedClub(club)}>
                  자주 묻는 질문
                </FaqButton>
              </CardBody>
            </Card>
          ))}
        </CardList>
      )}

      {selectedClub && (
        <ModalOverlay onMouseDown={() => setSelectedClub(null)}>
          <ModalContent onMouseDown={(event) => event.stopPropagation()}>
            <ModalTitle>[{selectedClub.name}] 자주 묻는 질문</ModalTitle>
            <ModalBody>
              {selectedClub.faq || '등록된 질문과 답변이 없습니다.'}
            </ModalBody>
            <CloseButton type="button" onClick={() => setSelectedClub(null)}>
              닫기
            </CloseButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </Page>
  )
}

const Page = styled.main`
  width: min(1200px, calc(100% - 40px));
  min-height: calc(100vh - 105px);
  margin: 0 auto;
  padding: 44px 0 80px;
`

const HeaderArea = styled.div`
  display: flex;
  margin-bottom: 36px;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;

  @media (max-width: 720px) {
    align-items: flex-start;
    flex-direction: column;
  }
`

const TitleArea = styled.div`
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 16px;
`

const PageTitle = styled.h1`
  margin: 0;
  color: #111;
  font-size: clamp(30px, 4vw, 42px);
`

const SubTitle = styled.p`
  margin: 0;
  color: #555;
  font-size: 15px;
`

const FilterArea = styled.div`
  position: relative;
`

const FilterButton = styled.button`
  padding: 11px 18px;
  color: #1a1a1a;
  font-size: 14px;
  font-weight: 700;
  background: #c5d89d;
  border: 0;
  border-radius: 10px;
  cursor: pointer;
`

const FilterDropdown = styled.div`
  position: absolute;
  top: 48px;
  right: 0;
  z-index: 10;
  width: 130px;
  overflow: hidden;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
`

const FilterOption = styled.button`
  width: 100%;
  padding: 11px 16px;
  color: #333;
  text-align: left;
  background: ${({ $selected }) => ($selected ? '#eef5db' : '#fff')};
  border: 0;
  cursor: pointer;
`

const StateMessage = styled.p`
  margin: 90px 0;
  color: ${({ $error }) => ($error ? '#b42318' : '#5d676b')};
  font-size: 20px;
  text-align: center;
`

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const Card = styled.article`
  padding: clamp(18px, 3vw, 28px);
  background: #eef5db;
  border-radius: 16px;
`

const CardTitle = styled.h2`
  margin: 0 0 16px;
  color: #111;
  font-size: 22px;
`

const CardBody = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 760px) {
    align-items: stretch;
    flex-direction: column;
  }
`

const ImageBox = styled.div`
  display: flex;
  width: 140px;
  height: 110px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: #e2e7df;
  border-radius: 12px;

  @media (max-width: 760px) {
    width: 100%;
    height: 180px;
  }
`

const ClubImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const ImagePlaceholder = styled.span`
  color: #68736d;
  font-size: 13px;
`

const InfoBox = styled.div`
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  gap: 14px;
`

const Description = styled.p`
  margin: 0;
  color: #222;
  font-size: 15px;
  line-height: 1.6;
`

const Meta = styled.div`
  display: flex;
  color: #444;
  font-size: 14px;
  flex-wrap: wrap;
  gap: 8px 24px;
`

const FaqButton = styled.button`
  padding: 14px 22px;
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  white-space: nowrap;
  background: #2d5a4d;
  border: 0;
  border-radius: 10px;
  cursor: pointer;
`

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  padding: 20px;
  background: rgba(0, 0, 0, 0.5);
  place-items: center;
`

const ModalContent = styled.div`
  width: min(520px, 100%);
  padding: 28px;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.15);
`

const ModalTitle = styled.h3`
  margin: 0;
  padding-bottom: 12px;
  color: #2d5a4d;
  font-size: 18px;
  border-bottom: 2px solid #eef5db;
`

const ModalBody = styled.div`
  max-height: 60vh;
  margin: 20px 0;
  overflow-y: auto;
  color: #333;
  font-size: 15px;
  line-height: 1.7;
  white-space: pre-wrap;
`

const CloseButton = styled.button`
  display: block;
  margin-left: auto;
  padding: 10px 18px;
  color: #fff;
  background: #2d5a4d;
  border: 0;
  border-radius: 8px;
  cursor: pointer;
`

export default Apply
