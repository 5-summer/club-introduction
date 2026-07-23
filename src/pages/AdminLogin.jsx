import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useAuth } from '../auth/useAuth.js'
import {
  deleteActivity,
  deleteClub,
  getActivities,
  getClubs,
} from '../lib/supabaseApi.js'

function AdminLogin() {
  const { isAdmin, loading, signInAsAdmin, signOut, isSupabaseConfigured } =
    useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [clubs, setClubs] = useState([])
  const [activities, setActivities] = useState([])
  const [managementLoading, setManagementLoading] = useState(false)

  useEffect(() => {
    if (!isAdmin) {
      return
    }

    setManagementLoading(true)
    Promise.all([getClubs(), getActivities()])
      .then(([clubData, activityData]) => {
        setClubs(clubData)
        setActivities(activityData)
      })
      .catch((error) => setErrorMessage(error.message))
      .finally(() => setManagementLoading(false))
  }, [isAdmin])

  const handleDeleteClub = async (club) => {
    if (!window.confirm(`'${club.name}' 동아리를 삭제할까요?`)) {
      return
    }

    setErrorMessage('')

    try {
      await deleteClub(club)
      setClubs((currentClubs) =>
        currentClubs.filter((currentClub) => currentClub.id !== club.id),
      )
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  const handleDeleteActivity = async (activity) => {
    const displayName = activity.club_name || activity.title

    if (!window.confirm(`'${displayName}' 활동 글을 삭제할까요?`)) {
      return
    }

    setErrorMessage('')

    try {
      await deleteActivity(activity)
      setActivities((currentActivities) =>
        currentActivities.filter(
          (currentActivity) => currentActivity.id !== activity.id,
        ),
      )
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrorMessage('')
    setSubmitting(true)

    try {
      await signInAsAdmin(id, password)
      navigate(location.state?.from ?? '/admin', { replace: true })
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return null
  }

  if (isAdmin) {
    return (
      <Page>
        <Heading>
          <h1>관리자 페이지</h1>
          <p>관리자 권한으로 작성 메뉴를 사용할 수 있습니다</p>
        </Heading>
        <AdminActions>
          <ActionLink to="/register">동아리 등록</ActionLink>
          <ActionLink to="/activity/write">활동 내용 작성</ActionLink>
        </AdminActions>
        {errorMessage && <ManagementMessage role="alert">{errorMessage}</ManagementMessage>}

        {managementLoading ? (
          <ManagementMessage>관리 목록을 불러오는 중입니다.</ManagementMessage>
        ) : (
          <ManagementGrid>
            <ManagementSection>
              <h2>동아리 등록 글 관리</h2>
              {clubs.length === 0 ? (
                <EmptyMessage>등록된 동아리가 없습니다.</EmptyMessage>
              ) : (
                <ManagementList>
                  {clubs.map((club) => (
                    <ManagementItem key={club.id}>
                      <ItemContent>
                        <strong>{club.name}</strong>
                        <span>
                          모집 {club.recruitment_count ?? 0}명 ·{' '}
                          {(club.grade ?? []).join(', ') || '학년 미등록'}
                        </span>
                      </ItemContent>
                      <ItemActions>
                        <EditLink to={`/register/${club.id}/edit`}>수정</EditLink>
                        <DeleteButton
                          type="button"
                          onClick={() => handleDeleteClub(club)}
                        >
                          삭제
                        </DeleteButton>
                      </ItemActions>
                    </ManagementItem>
                  ))}
                </ManagementList>
              )}
            </ManagementSection>

            <ManagementSection>
              <h2>활동 내용 글 관리</h2>
              {activities.length === 0 ? (
                <EmptyMessage>등록된 활동 글이 없습니다.</EmptyMessage>
              ) : (
                <ManagementList>
                  {activities.map((activity) => (
                    <ManagementItem key={activity.id}>
                      <ItemContent>
                        <strong>{activity.club_name || '동아리 이름 미등록'}</strong>
                        <span>{activity.title}</span>
                      </ItemContent>
                      <ItemActions>
                        <EditLink to={`/activity/${activity.id}/edit`}>
                          수정
                        </EditLink>
                        <DeleteButton
                          type="button"
                          onClick={() => handleDeleteActivity(activity)}
                        >
                          삭제
                        </DeleteButton>
                      </ItemActions>
                    </ManagementItem>
                  ))}
                </ManagementList>
              )}
            </ManagementSection>
          </ManagementGrid>
        )}
        <LogoutButton type="button" onClick={signOut}>
          로그아웃
        </LogoutButton>
      </Page>
    )
  }

  return (
    <Page>
      <Heading>
        <h1>관리자 로그인</h1>
        <p>관리자임을 인증하고 동아리 소개글을 작성해보세요</p>
      </Heading>

      <LoginForm onSubmit={handleSubmit}>
        <Field>
          ID
          <input
            autoComplete="username"
            value={id}
            onChange={(event) => setId(event.target.value)}
          />
        </Field>
        <Field>
          PW
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Field>

        {!isSupabaseConfigured && (
          <Message role="alert">
            Supabase 환경변수를 설정한 뒤 로그인할 수 있습니다.
          </Message>
        )}
        {errorMessage && <Message role="alert">{errorMessage}</Message>}

        <LoginButton type="submit" disabled={submitting || !isSupabaseConfigured}>
          {submitting ? '로그인 중...' : '로그인 하기'}
        </LoginButton>
      </LoginForm>
    </Page>
  )
}

const Page = styled.main`
  width: min(1124px, calc(100% - 40px));
  min-height: calc(100vh - 105px);
  margin: 0 auto;
  padding: 68px 0 80px;
  color: #000;
  text-align: left;
`

const Heading = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 9px;
  margin-bottom: 68px;

  h1 {
    margin: 0;
    color: #000;
    font-size: 50px;
    font-weight: 500;
    line-height: 1.2;
  }

  p {
    padding-bottom: 4px;
    font-size: 20px;
  }

  @media (max-width: 720px) {
    align-items: flex-start;
    flex-direction: column;

    h1 {
      font-size: 36px;
    }

    p {
      font-size: 16px;
    }
  }
`

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 73px;
`

const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 17px;
  font-size: 30px;

  input {
    width: 100%;
    height: 71px;
    padding: 14px 18px;
    color: #273338;
    background: #fff;
    border: 2px solid #2b5748;
    border-radius: 15px;
    outline: none;

    &:focus {
      box-shadow: 0 0 0 3px rgba(97, 135, 100, 0.2);
    }
  }
`

const LoginButton = styled.button`
  width: 100%;
  height: 89px;
  color: #fff;
  font-size: 50px;
  font-weight: 500;
  background: #2b5748;
  border: 0;
  border-radius: 15px;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }
`

const Message = styled.p`
  margin: -42px 0;
  color: #b42318;
  font-size: 18px;
`

const AdminActions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`

const ActionLink = styled(Link)`
  display: grid;
  min-height: 110px;
  padding: 20px;
  color: #fff;
  font-size: 25px;
  text-align: center;
  text-decoration: none;
  background: #2b5748;
  border-radius: 15px;
  place-items: center;
`

const LogoutButton = styled.button`
  display: block;
  margin: 40px 0 0 auto;
  padding: 12px 24px;
  color: #2b5748;
  font-size: 18px;
  background: #e6f3d3;
  border: 2px solid #2b5748;
  border-radius: 12px;
  cursor: pointer;
`

const ManagementMessage = styled.p`
  margin: 30px 0 0;
  color: #b42318;
  font-size: 17px;
`

const ManagementGrid = styled.div`
  display: grid;
  margin-top: 54px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 28px;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`

const ManagementSection = styled.section`
  padding: 24px;
  background: #f1f7e9;
  border: 1px solid #c9d9bb;
  border-radius: 16px;

  h2 {
    margin: 0 0 20px;
    color: #1f2c27;
    font-size: 24px;
  }
`

const ManagementList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const ManagementItem = styled.article`
  display: flex;
  padding: 15px;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  background: #fff;
  border-radius: 12px;
`

const ItemContent = styled.div`
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 5px;

  strong {
    overflow: hidden;
    color: #1f2c27;
    font-size: 17px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  span {
    color: #66716c;
    font-size: 13px;
  }
`

const ItemActions = styled.div`
  display: flex;
  flex-shrink: 0;
  gap: 8px;
`

const EditLink = styled(Link)`
  padding: 8px 12px;
  color: #fff;
  font-size: 14px;
  text-decoration: none;
  background: #2b5748;
  border-radius: 8px;
`

const DeleteButton = styled.button`
  padding: 8px 12px;
  color: #fff;
  font-size: 14px;
  background: #b42318;
  border: 0;
  border-radius: 8px;
  cursor: pointer;
`

const EmptyMessage = styled.p`
  margin: 0;
  color: #66716c;
  font-size: 15px;
`

export default AdminLogin
