import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import Filter from '../components/Filter'
import { isSupabaseConfigured } from '../lib/supabase'
import { getActivities } from '../lib/supabaseApi'

function Gallery() {
  const [showFilter, setShowFilter] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState(() => new Set())
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setError('Supabase 환경변수가 설정되지 않았습니다.')
      setLoading(false)
      return
    }

    getActivities()
      .then(setActivities)
      .catch((requestError) => {
        console.error('활동 내용을 불러오지 못했습니다.', requestError)
        setError('활동 내용을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.')
      })
      .finally(() => setLoading(false))
  }, [])

  const filteredActivities = useMemo(() => {
    if (selectedFilters.size === 0) {
      return activities
    }

    return activities.filter((activity) => {
      const club = activity.clubs
      if (!club) {
        return false
      }

      const clubTags = [
        ...(club.type ? [club.type] : []),
        ...(club.category ?? []),
        ...(club.detail ?? []),
        ...(club.grade ?? []),
        ...(club.interview ? ['면접'] : []),
      ]

      return [...selectedFilters].every((filter) => clubTags.includes(filter))
    })
  }, [activities, selectedFilters])

  return (
    <Container>
      <GalleryTitleArea>
        <TitleBox>
          <Title>갤러리</Title>
          <Description>
            날짜별로 동아리에서 활동한 내용과 사진을 확인해보세요
          </Description>
        </TitleBox>

        <FilterButton type="button" onClick={() => setShowFilter(true)}>
          필터{selectedFilters.size > 0 ? ` (${selectedFilters.size})` : ''} ☰
        </FilterButton>
      </GalleryTitleArea>

      {loading && <StateMessage>활동 내용을 불러오는 중입니다.</StateMessage>}
      {!loading && error && <StateMessage $error>{error}</StateMessage>}
      {!loading && !error && filteredActivities.length === 0 && (
        <StateMessage>
          {activities.length === 0
            ? '등록된 활동 내용이 없습니다.'
            : '선택한 필터에 맞는 활동 내용이 없습니다.'}
        </StateMessage>
      )}

      {!loading &&
        !error &&
        filteredActivities.map((activity) => (
          <Card key={activity.id}>
            <CardInfo>
              {(activity.club_name || activity.clubs?.name) && (
                <ClubName>{activity.club_name || activity.clubs.name}</ClubName>
              )}
              <CardTitle>{activity.title}</CardTitle>
              <CardText>{activity.content}</CardText>
            </CardInfo>

            {(activity.image_urls ?? []).length > 0 && (
              <ImageContainer>
                {activity.image_urls.map((imageUrl, index) => (
                  <ImageBox
                    key={imageUrl}
                    src={imageUrl}
                    alt={`${activity.club_name || activity.clubs?.name || '동아리'} 활동 사진 ${index + 1}`}
                  />
                ))}
              </ImageContainer>
            )}
          </Card>
        ))}

      {showFilter && (
        <Filter
          onClose={() => setShowFilter(false)}
          selectedOptions={selectedFilters}
          onChange={setSelectedFilters}
        />
      )}
    </Container>
  )
}

const Container = styled.main`
  width: min(1124px, calc(100% - 40px));
  min-height: calc(100vh - 105px);
  margin: 0 auto;
  padding: 60px 0 90px;
`

const GalleryTitleArea = styled.div`
  display: flex;
  margin-bottom: 60px;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;

  @media (max-width: 680px) {
    align-items: flex-start;
    flex-direction: column;
  }
`

const TitleBox = styled.div`
  display: flex;
  align-items: baseline;
  gap: 14px;

  @media (max-width: 680px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 8px;
  }
`

const Title = styled.h1`
  margin: 0;
  color: #111;
  font-size: 42px;
`

const Description = styled.p`
  margin: 0;
  color: #4f5a55;
  font-size: 16px;
`

const FilterButton = styled.button`
  padding: 10px 18px;
  color: #2b5742;
  font-weight: 700;
  background: #b8d898;
  border: 0;
  border-radius: 20px;
  cursor: pointer;
`

const StateMessage = styled.p`
  margin: 90px 0;
  color: ${({ $error }) => ($error ? '#b42318' : '#5d676b')};
  font-size: 20px;
  text-align: center;
`

const Card = styled.article`
  display: flex;
  margin-bottom: 28px;
  padding: 28px;
  background: #f1f7e9;
  border-radius: 16px;
  flex-direction: column;
  gap: 24px;
`

const CardInfo = styled.div`
  min-width: 0;
`

const ClubName = styled.p`
  margin: 0 0 7px;
  color: #2b5748;
  font-size: 15px;
  font-weight: 700;
`

const CardTitle = styled.h2`
  margin: 0 0 14px;
  color: #1f2c27;
  font-size: 24px;
`

const CardText = styled.p`
  margin: 0;
  color: #39443f;
  line-height: 1.7;
  white-space: pre-wrap;
`

const ImageContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
`

const ImageBox = styled.img`
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: 12px;
`

export default Gallery
