import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Filter from '../components/Filter'
import { isSupabaseConfigured } from '../lib/supabase'
import { getClubs } from '../lib/supabaseApi'

const FILTER_GROUPS = [
  { title: '면접 유무', options: ['면접'] },
  { title: '동아리 유형', options: ['상설', '창체'] },
  {
    title: '동아리 특성',
    options: [
      '이과', '문과', '예체능',
      '국어', '독서', '수학', '사회', '경제', '정치', '지리', '역사', '과학',
      '물리', '화학', '생명', '지구', 'IT', '심리', '교육', '봉사', '진로', '미술', '체육'
    ],
  },
  { title: '모집 학년', options: ['1학년', '2학년', '3학년'] },
]

function includesSelectedOption(club, title, selectedOptions) {
  const groupObj = FILTER_GROUPS.find((group) => group.title === title)
  if (!groupObj) return true

  const selectedInGroup = selectedOptions.filter((option) =>
    groupObj.options.includes(option),
  )

  if (selectedInGroup.length === 0) {
    return true
  }

  if (title === '면접 유무') {
    return selectedInGroup.includes('면접') ? Boolean(club.interview) : true
  }

  if (title === '동아리 유형') {
    return selectedInGroup.includes(club.type)
  }

  if (title === '동아리 특성') {
    const features = [...(club.category ?? []), ...(club.detail ?? [])]
    return selectedInGroup.some((option) => features.includes(option))
  }

  if (title === '모집 학년') {
    return selectedInGroup.some((option) =>
      (club.grade ?? []).some((grade) => grade.includes(option.replace('학년', ''))),
    )
  }

  return true
}

function List() {
  const [showFilter, setShowFilter] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedFilters, setSelectedFilters] = useState(() => new Set())
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
        console.error('동아리 목록을 불러오지 못했습니다.', requestError)
        setError('동아리 목록을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.')
      })
      .finally(() => setLoading(false))
  }, [])

  const filteredClubs = useMemo(() => {
    const keyword = search.replaceAll(' ', '').toLowerCase()
    const selectedOptions = [...selectedFilters]

    return clubs.filter((club) => {
      const category = club.category ?? []
      const detail = club.detail ?? []
      const grade = club.grade ?? []
      const typeStr = club.type ?? ''
      
      const searchableText = [
        club.name,
        club.teacher,
        club.description,
        ...category,
        ...detail,
        ...grade,
        typeStr,
        club.interview ? '면접' : '비면접',
      ]
        .filter(Boolean)
        .join('')
        .replaceAll(' ', '')
        .toLowerCase()

      const matchesFilters = FILTER_GROUPS.every(({ title }) =>
        includesSelectedOption(club, title, selectedOptions),
      )

      return searchableText.includes(keyword) && matchesFilters
    })
  }, [clubs, search, selectedFilters])

  return (
    <Container>
      <SearchBox>
        <SearchInput
          type="search"
          aria-label="동아리 검색"
          placeholder="동아리 이름이나 특징을 검색하세요"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </SearchBox>

      <FilterButton type="button" onClick={() => setShowFilter(true)}>
        필터{selectedFilters.size > 0 ? ` (${selectedFilters.size})` : ''}
      </FilterButton>

      {loading && <StateMessage>동아리 목록을 불러오는 중입니다.</StateMessage>}
      {!loading && error && <StateMessage $error>{error}</StateMessage>}
      {!loading && !error && filteredClubs.length === 0 && (
        <StateMessage>
          {clubs.length === 0
            ? '등록된 동아리가 없습니다.'
            : '검색 조건에 맞는 동아리가 없습니다.'}
        </StateMessage>
      )}

      {!loading && !error && filteredClubs.length > 0 && (
        <CardArea>
          {filteredClubs.map((club) => (
            <ClubCard
              key={club.id}
              to={`/introduce/${club.id}`}
              aria-label={`${club.name} 소개 페이지로 이동`}
            >
              <ImageBox>
                {club.image_url ? (
                  <ClubImage src={club.image_url} alt={`${club.name} 대표 사진`} />
                ) : (
                  <ImagePlaceholder>등록된 사진이 없습니다</ImagePlaceholder>
                )}
              </ImageBox>

              <InfoBox>
                <h3>{club.name}</h3>
                <p>{club.description || '등록된 소개가 없습니다.'}</p>
                
                <TagArea>
                  {/* 1. 동아리 유형 */}
                  {club.type && <Tag>{club.type}</Tag>}

                  {/* 2. 동아리 특성 */}
                  {(club.category ?? []).map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                  {(club.detail ?? []).map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}

                  {/* 3. 모집 학년 */}
                  {(club.grade ?? []).map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}

                  {/* 4. 면접 유무 */}
                  <Tag>{club.interview ? '면접' : '비면접'}</Tag>
                </TagArea>
              </InfoBox>
            </ClubCard>
          ))}
        </CardArea>
      )}

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
  display: flex;
  width: min(1124px, calc(100% - 40px));
  min-height: calc(100vh - 105px);
  margin: 0 auto;
  padding: 60px 0 80px;
  flex-direction: column;
  align-items: center;
`

const SearchBox = styled.div`
  display: flex;
  width: min(943px, 100%);
  min-height: 68px;
  padding: 0 20px;
  align-items: center;
  border: 2px solid #2b5748;
  border-radius: 15px;
`

const SearchInput = styled.input`
  width: 100%;
  color: #273338;
  font-size: 20px;
  border: 0;
  outline: 0;
`

const FilterButton = styled.button`
  align-self: flex-end;
  min-width: 140px;
  min-height: 55px;
  margin-top: 40px;
  padding: 10px 20px;
  color: #273338;
  font-size: 20px;
  background: #b0d8b3;
  border: 0;
  border-radius: 15px;
  cursor: pointer;
`

const StateMessage = styled.p`
  width: 100%;
  margin: 70px 0 0;
  color: ${({ $error }) => ($error ? '#b42318' : '#5d676b')};
  font-size: 20px;
  text-align: center;
`

const CardArea = styled.div`
  display: grid;
  width: 100%;
  margin-top: 60px;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 58px 40px;
`

const ClubCard = styled(Link)`
  display: flex;
  min-height: 322px;
  overflow: hidden;
  color: inherit;
  text-decoration: none;
  border-radius: 30px;
  flex-direction: column;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 24px rgba(43, 87, 72, 0.16);
  }

  &:focus-visible {
    outline: 3px solid #618764;
    outline-offset: 4px;
  }
`

const ImageBox = styled.div`
  display: flex;
  height: 170px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  background: #e4e8e4;
`

const ClubImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const ImagePlaceholder = styled.span`
  color: #68736d;
  font-size: 14px;
`

const InfoBox = styled.div`
  min-height: 174px;
  padding: 16px 19px 20px;
  background: #e6f3d3;
  box-sizing: border-box;

  h3 {
    margin: 0 0 11px;
    color: #1f2c27;
    font-size: 20px;
    font-weight: 600;
  }

  p {
    display: -webkit-box;
    min-height: 40px;
    margin: 0 0 14px;
    overflow: hidden;
    color: #404b46;
    font-size: 13px;
    line-height: 20px;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
`

const TagArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`

const Tag = styled.span`
  padding: 5px 12px;
  color: #2b5748;
  font-size: 13px;
  background: #f8fbf4;
  border: 1px solid #2b5748;
  border-radius: 30px;
`

export default List