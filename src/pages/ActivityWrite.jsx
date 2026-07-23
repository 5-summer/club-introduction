import { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import styled from 'styled-components'

const Page = styled.main`
  width: min(1124px, calc(100% - 40px));
  margin: 0 auto;
  padding: 68px 0 90px;
  color: #000;
  text-align: left;
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

  textarea {
    width: 100%;
    min-height: 410px;
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

function ActivityWrite() {
  const [photos, setPhotos] = useState([])

  const handlePhotos = (event) => {
    const selectedPhotos = Array.from(event.target.files)
    const newPhotos = selectedPhotos.map((file) => ({
      id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`,
      name: file.name,
      url: URL.createObjectURL(file),
    }))

    setPhotos((currentPhotos) => [...currentPhotos, ...newPhotos])
    event.target.value = ''
  }

  return (
    <Page>
      <PageHeading>
        <h1>활동 내용 작성</h1>
        <p>활동한 내용을 작성하고 사진을 추가해주세요</p>
      </PageHeading>

      <Form onSubmit={(event) => event.preventDefault()}>
        <Field>
          활동 내용 작성하기
          <textarea name="activity" aria-label="활동 내용" />
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
          {photos.length > 0 && (
            <PhotoSlots>
              {photos.map((photo) => (
                <PhotoSlot key={photo.id}>
                  <img src={photo.url} alt={photo.name} />
                </PhotoSlot>
              ))}
            </PhotoSlots>
          )}
        </PhotoField>

        <SubmitButton type="submit">등록하기</SubmitButton>
      </Form>
    </Page>
  )
}

export default ActivityWrite
