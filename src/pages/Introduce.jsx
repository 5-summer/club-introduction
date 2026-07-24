import { useEffect, useMemo, useState } from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { isSupabaseConfigured } from '../lib/supabase'
import { getClub } from '../lib/supabaseApi'

function Introduce() {
  const { clubId } = useParams()
  const navigate = useNavigate()
  const [club, setClub] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setError('Supabase 환경변수가 설정되지 않았습니다.')
      setLoading(false)
      return
    }

    getClub(clubId)
      .then((clubData) => {
        if (!clubData) {
          setError('해당 동아리를 찾을 수 없습니다.')
          return
        }

        setClub(clubData)
      })
      .catch((requestError) => {
        console.error('동아리 소개를 불러오지 못했습니다.', requestError)
        setError('동아리 소개를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.')
      })
      .finally(() => setLoading(false))
  }, [clubId])

  const tags = useMemo(() => {
    if (!club) {
      return []
    }

    return [
      ...(club.category ?? []),
      ...(club.detail ?? []),
      ...(club.grade ?? []),
      ...(club.type ?? []),
      club.interview ? '면접' : '비면접',
    ]
  }, [club])

  return (
    <Container>
      <BackButton
        type="button"
        aria-label="목록 페이지로 돌아가기"
        onClick={() => navigate('/list')}
      >
        <AiOutlineArrowLeft aria-hidden="true" />
      </BackButton>

      {loading && <StateMessage>동아리 소개를 불러오는 중입니다.</StateMessage>}
      {!loading && error && <StateMessage $error>{error}</StateMessage>}

      {!loading && !error && club && (
        <>
          <TitleSection>
            <MainTitle>{club.name}</MainTitle>
            <TeacherName>담당 선생님: {club.teacher || '미등록'}</TeacherName>
          </TitleSection>

          {club.image_url && (
            <RepresentativeImage
              src={club.image_url}
              alt={`${club.name} 대표 사진`}
            />
          )}

          <RecruitmentInfo>
            <span>
              <strong>모집 인원</strong>
              {club.recruitment_count ?? 0}명
            </span>
            <span>
              <strong>모집 학년</strong>
              {(club.grade ?? []).join(', ') || '미등록'}
            </span>
          </RecruitmentInfo>

          <Section>
            <SectionLabel>동아리 소개</SectionLabel>
            <ContentBox>{club.description || '등록된 소개가 없습니다.'}</ContentBox>
          </Section>

          <Section>
            <SectionLabel>우리 동아리의 장점</SectionLabel>
            <ContentBox>{club.strengths || '등록된 장점이 없습니다.'}</ContentBox>
          </Section>

          <Section>
            <SectionLabel>자주 묻는 질문과 답변</SectionLabel>
            <ContentBox>{club.faq || '등록된 질문과 답변이 없습니다.'}</ContentBox>
          </Section>

          <Section>
            <SectionLabel>동아리의 특징</SectionLabel>
            <TagGroup>
              {tags.map((tag) => (
                <Tag key={tag}># {tag}</Tag>
              ))}
            </TagGroup>
          </Section>
        </>
      )}
    </Container>
  )
}

const Container = styled.main`
  position: relative;
  width: min(900px, calc(100% - 40px));
  min-height: calc(100vh - 105px);
  margin: 0 auto;
  padding: 56px 0 80px;
  color: #273338;
  text-align: left;
`

const BackButton = styled.button`
  display: grid;
  width: 48px;
  height: 48px;
  margin-bottom: 28px;
  padding: 0;
  color: #2b5748;
  background: #e6f3d3;
  border: 2px solid #2b5748;
  border-radius: 50%;
  place-items: center;
  cursor: pointer;

  &:hover {
    color: #fff;
    background: #2b5748;
  }

  &:focus-visible {
    outline: 3px solid rgba(97, 135, 100, 0.4);
    outline-offset: 3px;
  }

  svg {
    width: 28px;
    height: 28px;
  }
`

const StateMessage = styled.p`
  margin: 100px 0;
  color: ${({ $error }) => ($error ? '#b42318' : '#5d676b')};
  font-size: 20px;
  text-align: center;
`

const TitleSection = styled.div`
  margin-bottom: 38px;
  text-align: center;
`

const MainTitle = styled.h1`
  margin: 0 0 12px;
  color: #111;
  font-size: clamp(34px, 6vw, 50px);
  font-weight: 800;
`

const TeacherName = styled.p`
  margin: 0;
  color: #3c4842;
  font-size: 18px;
  text-align: right;
`

const RepresentativeImage = styled.img`
  width: 100%;
  max-height: 460px;
  margin-bottom: 34px;
  object-fit: cover;
  border-radius: 18px;
`

const RecruitmentInfo = styled.div`
  display: flex;
  margin-bottom: 30px;
  padding: 20px 24px;
  color: #2b5748;
  background: #e6f3d3;
  border-radius: 12px;
  flex-wrap: wrap;
  gap: 18px 42px;

  span {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`

const Section = styled.section`
  margin-bottom: 30px;
`

const SectionLabel = styled.h2`
  margin: 0 0 12px;
  color: #111;
  font-size: 22px;
`

const ContentBox = styled.div`
  min-height: 80px;
  padding: 24px;
  color: #333;
  font-size: 16px;
  line-height: 1.7;
  white-space: pre-wrap;
  background-color: #f1f7e9;
  border: 1.5px solid #2b5742;
  border-radius: 12px;
`

const TagGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`

const Tag = styled.span`
  padding: 8px 16px;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  background-color: #2b5742;
  border-radius: 20px;
`

export default Introduce
