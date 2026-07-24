import { useEffect, useState } from 'react'
import { AiOutlineArrowLeft, AiOutlinePlus } from 'react-icons/ai'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { createClub, getClub, updateClub } from '../lib/supabaseApi.js'

const Page = styled.main`
  position: relative;
  width: min(1124px, calc(100% - 40px));
  margin: 0 auto;
  padding: 68px 0 70px;
  color: #000;
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

  svg {
    width: 28px;
    height: 28px;
  }
`

const PageHeading = styled.div`
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
    letter-spacing: 0;
  }

  p {
    padding-bottom: 4px;
    color: #000;
    font-size: 20px;
    line-height: 1.2;
  }

  @media (max-width: 720px) {
    align-items: flex-start;
    flex-direction: column;
    margin-bottom: 44px;

    h1 {
      font-size: 36px;
    }

    p {
      font-size: 16px;
    }
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 43px;
`

const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 17px;
  color: #000;
  font-size: 30px;
  line-height: 1.2;

  input,
  textarea {
    width: 100%;
    padding: 14px 18px;
    color: #273338;
    background: rgba(230, 243, 211, 0.55);
    border: 2px solid #2b5748;
    border-radius: 15px;
    outline: none;
    resize: vertical;
    transition:
      box-shadow 0.2s ease,
      background 0.2s ease;

    &:focus {
      background: #f3f8eb;
      box-shadow: 0 0 0 3px rgba(97, 135, 100, 0.2);
    }
  }

  input {
    height: 60px;
  }

  textarea {
    min-height: 126px;
  }

  @media (max-width: 720px) {
    gap: 10px;
    font-size: 21px;
  }
`

const TagsField = styled.fieldset`
  margin: 0;
  padding: 0;
  border: 0;

  legend {
    margin-bottom: 16px;
    color: #000;
    font-size: 30px;
  }
`

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`

const Tag = styled.label`
  cursor: pointer;

  input {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    opacity: 0;
  }

  span {
    display: block;
    padding: 4px 22px;
    color: #fff;
    font-size: 30px;
    line-height: 36px;
    background: #2b5748;
    border-radius: 100px;
  }

  input:focus-visible + span {
    outline: 3px solid rgba(97, 135, 100, 0.35);
    outline-offset: 3px;
  }

  input:not(:checked) + span {
    color: #2b5748;
    background: #e6f3d3;
  }
`

const PhotoField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
`

const PhotoHeading = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  color: #000;
  font-size: 30px;
`

const FileButton = styled.label`
  display: inline-flex;
  height: 42px;
  align-items: center;
  gap: 6px;
  padding: 3px 11px;
  color: #fff;
  font-size: 30px;
  line-height: 36px;
  background: #618764;
  border-radius: 10px;
  cursor: pointer;

  input {
    display: none;
  }

  svg {
    width: 30px;
    height: 30px;
  }
`

const PhotoSlots = styled.div`
  display: grid;
  width: min(947px, 100%);
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 28px;
`

const PhotoSlot = styled.div`
  height: 171px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 15px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 720px) {
    height: 120px;
  }
`

const SubmitButton = styled.button`
  width: 100%;
  height: 89px;
  margin-top: 30px;
  color: #fff;
  font-size: 50px;
  font-weight: 500;
  background: #2b5748;
  border: 0;
  border-radius: 15px;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:hover {
    background: #273338;
  }

  &:focus-visible {
    outline: 3px solid rgba(97, 135, 100, 0.45);
    outline-offset: 3px;
  }

  @media (max-width: 720px) {
    height: 68px;
    font-size: 32px;
  }
`

const StatusMessage = styled.p`
  margin: -18px 0;
  color: #b42318;
  font-size: 18px;
`

const featureTagOptions = [
  '면접',
  '이과',
  '문과',
  '예체능',
  '국어',
  '언어',
  '수학',
  '사회',
  '경제',
  '정치',
  '역사',
  '과학',
  '물리',
  '화학',
  '생명',
  '지구',
  'IT',
  '심리',
  '교육',
  '음악',
  '미술',
  '체육',
  '간호'
]

const gradeOptions = ['1학년', '2학년']

function ClubRegister() {
  const navigate = useNavigate()
  const { clubId } = useParams()
  const isEditing = Boolean(clubId)
  const [form, setForm] = useState({
    clubName: '',
    teacher: '',
    introduction: '',
    strengths: '',
    faq: '',
    recruitmentCount: '',
  })
  const [selectedTags, setSelectedTags] = useState(() => new Set())
  const [photo, setPhoto] = useState(null)
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(isEditing)

  useEffect(() => {
    if (!isEditing) {
      return
    }

    getClub(clubId)
      .then((club) => {
        if (!club) {
          setMessage('수정할 동아리를 찾을 수 없습니다.')
          return
        }

        setForm({
          clubName: club.name,
          teacher: club.teacher,
          introduction: club.description,
          strengths: club.strengths,
          faq: club.faq,
          recruitmentCount: String(club.recruitment_count ?? 0),
        })
        setSelectedTags(
          new Set([
            ...(club.category ?? []),
            ...(club.detail ?? []),
            ...(club.grade ?? []),
            ...(club.interview ? ['면접'] : []),
          ]),
        )

        if (club.image_url) {
          setPhoto({ file: null, url: club.image_url })
        }
      })
      .catch((error) => setMessage(error.message))
      .finally(() => setLoading(false))
  }, [clubId, isEditing])

  const handlePhotos = (event) => {
    const selectedPhoto = event.target.files[0]

    if (!selectedPhoto) {
      return
    }

    setPhoto((currentPhoto) => {
      if (currentPhoto?.file) {
        URL.revokeObjectURL(currentPhoto.url)
      }

      return {
        file: selectedPhoto,
        url: URL.createObjectURL(selectedPhoto),
        previousUrl:
          currentPhoto?.previousUrl ??
          (currentPhoto && !currentPhoto.file ? currentPhoto.url : null),
      }
    })
    event.target.value = ''
  }

  const handleInput = (event) => {
    const { name, value } = event.target
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
  }

  const handleTag = (tag) => {
    setSelectedTags((currentTags) => {
      const nextTags = new Set(currentTags)

      if (nextTags.has(tag)) {
        nextTags.delete(tag)
      } else {
        nextTags.add(tag)
      }

      return nextTags
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setMessage('')

    if (!form.clubName.trim()) {
      setMessage('동아리 이름을 입력해주세요.')
      return
    }

    const recruitmentCount = Number(form.recruitmentCount)

    if (
      form.recruitmentCount === '' ||
      !Number.isInteger(recruitmentCount) ||
      recruitmentCount < 0
    ) {
      setMessage('모집 인원은 0명 이상의 정수로 입력해주세요.')
      return
    }

    setSubmitting(true)

    try {
      const tags = [...selectedTags]

      const clubData = {
        name: form.clubName.trim(),
        teacher: form.teacher.trim(),
        description: form.introduction.trim(),
        strengths: form.strengths.trim(),
        faq: form.faq.trim(),
        category: tags.filter((tag) => ['이과', '문과', '예체능'].includes(tag)),
        detail: tags.filter((tag) =>
          ['국어', '언어', '수학', '사회', '경제', '정치', '역사', '과학', '물리', '화학', '생명', '지구', 'IT', '심리', '교육', '음악', '미술', '체육', '간호'].includes(tag),
        ),
        grade: tags.filter((tag) => gradeOptions.includes(tag)),
        interview: tags.includes('면접'),
        recruitment_count: recruitmentCount,
      }

      if (isEditing) {
        await updateClub({
          clubId,
          club: clubData,
          photo: photo?.file ?? null,
          previousImageUrl: photo?.file ? photo.previousUrl : photo?.url,
        })
      } else {
        await createClub({
          club: clubData,
          photo: photo?.file ?? null,
        })
      }

      navigate('/admin')
    } catch (error) {
      setMessage(error.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Page>
      <BackButton
        type="button"
        aria-label="관리자 페이지로 돌아가기"
        onClick={() => navigate('/admin')}
      >
        <AiOutlineArrowLeft aria-hidden="true" />
      </BackButton>

      <PageHeading>
        <h1>{isEditing ? '동아리 수정' : '동아리 등록'}</h1>
        <p>
          {isEditing
            ? '등록된 동아리 정보를 수정해주세요'
            : '동아리를 학생들에게 소개하는 글을 작성해주세요'}
        </p>
      </PageHeading>

      {loading ? (
        <StatusMessage>동아리 정보를 불러오는 중입니다.</StatusMessage>
      ) : (
      <Form onSubmit={handleSubmit}>
        <Field>
          동아리 이름
          <input
            name="clubName"
            aria-label="동아리 이름"
            value={form.clubName}
            onChange={handleInput}
          />
        </Field>

        <Field>
          담당 선생님
          <input
            name="teacher"
            aria-label="담당 선생님"
            value={form.teacher}
            onChange={handleInput}
          />
        </Field>

        <Field>
          모집 인원
          <input
            type="number"
            min="0"
            step="1"
            name="recruitmentCount"
            aria-label="모집 인원"
            placeholder="예: 10"
            value={form.recruitmentCount}
            onChange={handleInput}
          />
        </Field>

        <Field>
          동아리 소개 작성
          <textarea
            name="introduction"
            aria-label="동아리 소개"
            value={form.introduction}
            onChange={handleInput}
          />
        </Field>

        <Field>
          우리 동아리의 장점 작성
          <textarea
            name="strengths"
            aria-label="동아리의 장점"
            value={form.strengths}
            onChange={handleInput}
          />
        </Field>

        <Field>
          자주 묻는 질문과 답변 작성
          <textarea
            name="faq"
            aria-label="자주 묻는 질문과 답변"
            value={form.faq}
            onChange={handleInput}
          />
        </Field>

        <TagsField>
          <legend>동아리의 특징 작성하기</legend>
          <Tags>
            {featureTagOptions.map((tag) => (
              <Tag key={tag}>
                <input
                  type="checkbox"
                  name="tags"
                  value={tag}
                  checked={selectedTags.has(tag)}
                  onChange={() => handleTag(tag)}
                />
                <span># {tag}</span>
              </Tag>
            ))}
          </Tags>
        </TagsField>

        <TagsField>
          <legend>모집 학년 선택하기</legend>
          <Tags>
            {gradeOptions.map((grade) => (
              <Tag key={grade}>
                <input
                  type="checkbox"
                  name="grades"
                  value={grade}
                  checked={selectedTags.has(grade)}
                  onChange={() => handleTag(grade)}
                />
                <span># {grade}</span>
              </Tag>
            ))}
          </Tags>
        </TagsField>

        <PhotoField>
          <PhotoHeading>
            <span>활동 사진 넣기</span>
            <FileButton>
              사진 추가
              <AiOutlinePlus aria-hidden="true" />
              <input type="file" accept="image/*" onChange={handlePhotos} />
            </FileButton>
          </PhotoHeading>
          {photo && (
            <PhotoSlots>
              <PhotoSlot>
                <img src={photo.url} alt="동아리 대표 사진" />
              </PhotoSlot>
            </PhotoSlots>
          )}
        </PhotoField>

        {message && <StatusMessage role="alert">{message}</StatusMessage>}
        <SubmitButton type="submit" disabled={submitting}>
          {submitting
            ? isEditing
              ? '수정 중...'
              : '등록 중...'
            : isEditing
              ? '수정하기'
              : '등록하기'}
        </SubmitButton>
      </Form>
      )}
    </Page>
  )
}

export default ClubRegister
