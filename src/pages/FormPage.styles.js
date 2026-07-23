import styled from "styled-components";

export const Page = styled.main`
  width: min(1124px, calc(100% - 40px));
  margin: 0 auto;
  padding: 68px 0 70px;
  color: #000;
  text-align: left;
`;

export const PageHeading = styled.div`
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
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 43px;
`;

export const Field = styled.label`
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
`;

export const TagsField = styled.fieldset`
  margin: 0;
  padding: 0;
  border: 0;

  legend {
    margin-bottom: 16px;
    color: #000;
    font-size: 30px;
  }
`;

export const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

export const Tag = styled.label`
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
`;

export const PhotoField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
`;

export const PhotoHeading = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  color: #000;
  font-size: 30px;
`;

export const FileButton = styled.label`
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
`;

export const PhotoSlots = styled.div`
  display: grid;
  width: min(947px, 100%);
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 28px;
`;

export const PhotoSlot = styled.div`
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
`;

export const SubmitButton = styled.button`
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
`;
