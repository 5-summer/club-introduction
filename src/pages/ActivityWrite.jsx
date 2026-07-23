import { useEffect, useState } from 'react'
import {
  AiOutlineArrowLeft,
  AiOutlineClose,
  AiOutlinePlus,
} from 'react-icons/ai'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import {
  createActivity,
  getActivity,
  updateActivity,
} from '../lib/supabaseApi.js'

const Page = styled.main`
  position: relative;
  width: min(1124px, calc(100% - 40px));
  margin: 0 auto;
  padding: 68px 0 90px;
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
    padding: 18px;
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
    height: 64px;
  }

  textarea {
    min-height: 410px;
  }

  @media (max-width: 720px) {
    gap: 10px;
    font-size: 21px;

    textarea {
      min-height: 280px;
    }
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
  position: relative;
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

const RemovePhotoButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  display: grid;
  width: 34px;
  height: 34px;
  padding: 0;
  color: #fff;
  background: rgba(39, 51, 56, 0.78);
  border: 0;
  border-radius: 50%;
  place-items: center;
  cursor: pointer;
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

function ActivityWrite() {
  const navigate = useNavigate()
  const { activityId } = useParams()
  const isEditing = Boolean(activityId)
  const [clubName, setClubName] = useState('')
  const [content, setContent] = useState('')
  const [photos, setPhotos] = useState([])
  const [existingImageUrls, setExistingImageUrls] = useState([])
  const [removedImageUrls, setRemovedImageUrls] = useState([])
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(isEditing)

  useEffect(() => {
    if (!isEditing) {
      return
    }

    getActivity(activityId)
      .then((activity) => {
        if (!activity) {
          setMessage('수정할 활동 글을 찾을 수 없습니다.')
          return
        }

        setClubName(activity.club_name || activity.clubs?.name || '')
        setContent(activity.content)
        setExistingImageUrls(activity.image_urls ?? [])
      })
      .catch((error) => setMessage(error.message))
      .finally(() => setLoading(false))
  }, [activityId, isEditing])

  const handlePhotos = (event) => {
    const selectedPhotos = Array.from(event.target.files)
    const newPhotos = selectedPhotos.map((file) => ({
      id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`,
      name: file.name,
      file,
      url: URL.createObjectURL(file),
    }))

    setPhotos((currentPhotos) => [...currentPhotos, ...newPhotos])
    event.target.value = ''
  }

  const removeNewPhoto = (photoId) => {
    setPhotos((currentPhotos) =>
      currentPhotos.filter((photo) => {
        if (photo.id === photoId) {
          URL.revokeObjectURL(photo.url)
          return false
        }

        return true
      }),
    )
  }

  const removeExistingPhoto = (imageUrl) => {
    setExistingImageUrls((currentUrls) =>
      currentUrls.filter((url) => url !== imageUrl),
    )
    setRemovedImageUrls((currentUrls) => [...currentUrls, imageUrl])
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setMessage('')

    if (!clubName.trim()) {
      setMessage('동아리 이름을 입력해주세요.')
      return
    }

    if (!content.trim()) {
      setMessage('활동 내용을 입력해주세요.')
      return
    }

    setSubmitting(true)

    try {
      if (isEditing) {
        await updateActivity({
          activityId,
          clubName: clubName.trim(),
          content: content.trim(),
          existingImageUrls,
          newPhotos: photos.map((photo) => photo.file),
          removedImageUrls,
        })
      } else {
        await createActivity({
          clubName: clubName.trim(),
          content: content.trim(),
          photos: photos.map((photo) => photo.file),
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
        <h1>{isEditing ? '활동 내용 수정' : '활동 내용 작성'}</h1>
        <p>
          {isEditing
            ? '작성한 활동 내용과 사진을 수정해주세요'
            : '활동한 내용을 작성하고 사진을 추가해주세요'}
        </p>
      </PageHeading>

      {loading ? (
        <StatusMessage>활동 내용을 불러오는 중입니다.</StatusMessage>
      ) : (
      <Form onSubmit={handleSubmit}>
        <Field>
          동아리 이름
          <input
            name="clubName"
            aria-label="동아리 이름"
            placeholder="동아리 이름을 입력하세요"
            value={clubName}
            onChange={(event) => setClubName(event.target.value)}
          />
        </Field>

        <Field>
          활동 내용 작성하기
          <textarea
            name="activity"
            aria-label="활동 내용"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </Field>

        <PhotoField>
          <PhotoHeading>
            <span>활동 사진 넣기</span>
            <FileButton>
              사진 추가
              <AiOutlinePlus aria-hidden="true" />
              <input type="file" accept="image/*" multiple onChange={handlePhotos} />
            </FileButton>
          </PhotoHeading>
          {(existingImageUrls.length > 0 || photos.length > 0) && (
            <PhotoSlots>
              {existingImageUrls.map((imageUrl) => (
                <PhotoSlot key={imageUrl}>
                  <img src={imageUrl} alt="기존 활동 사진" />
                  <RemovePhotoButton
                    type="button"
                    aria-label="기존 사진 삭제"
                    onClick={() => removeExistingPhoto(imageUrl)}
                  >
                    <AiOutlineClose aria-hidden="true" />
                  </RemovePhotoButton>
                </PhotoSlot>
              ))}
              {photos.map((photo) => (
                <PhotoSlot key={photo.id}>
                  <img src={photo.url} alt={photo.name} />
                  <RemovePhotoButton
                    type="button"
                    aria-label={`${photo.name} 삭제`}
                    onClick={() => removeNewPhoto(photo.id)}
                  >
                    <AiOutlineClose aria-hidden="true" />
                  </RemovePhotoButton>
                </PhotoSlot>
              ))}
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

export default ActivityWrite
