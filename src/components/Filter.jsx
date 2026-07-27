import { AiOutlineClose } from 'react-icons/ai'
import { GrPowerReset } from 'react-icons/gr'
import styled from 'styled-components'

const FILTER_GROUPS = [
  { title: '면접 유무', options: ['면접'] },
  { title: '동아리 유형', options: ['상설', '창체'] },
  {
    title: '동아리 특성',
    options: [
      '이과', '문과', '예체능',
      '국어', '독서', '수학', '사회', '경제', '정치', '지리', '역사', '과학',
      '물리', '화학', '생명', '지구', 'IT', '영어', '심리', '교육', '봉사', '진로', '음악', '미술', '체육'
    ],
  },
  { title: '모집 학년', options: ['1학년', '2학년', '3학년'] },
]

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  padding: 24px;
  background: rgba(39, 51, 56, 0.45);
`

const Modal = styled.div`
  width: min(853px, 100%);
  min-height: 674px;
  max-height: 90vh; /* 화면 높이의 90%까지만 커지도록 제한 */
  display: flex;
  flex-direction: column; /* 내부 요소를 세로로 배치 */
  padding: 36px 24px 48px;
  overflow: hidden; /* 모달 전체가 스크롤되는 것을 방지 */
  background: #ffffff;
  border-radius: 30px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 640px) {
    min-height: auto;
    padding: 24px;
  }
`

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px 23px;
  border-bottom: 1px solid #d9d9d9;
  flex-shrink: 0; /* 스크롤 시 영역이 찌그러지지 않도록 고정 */
`

const Title = styled.h2`
  margin: 0;
  color: #000000;
  font-size: 30px;
  font-weight: 500;
`

const IconButton = styled.button`
  display: grid;
  place-items: center;
  padding: 0;
  color: #000000;
  background: transparent;
  border: 0;
  cursor: pointer;
`

const ResetRow = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 17px 5px 0;
  margin-bottom: 20px; /* 아래 스크롤 영역과의 간격 추가 */
  flex-shrink: 0; /* 스크롤 시 영역이 찌그러지지 않도록 고정 */
`

const ResetButton = styled.button`
  display: flex;
  gap: 15px;
  align-items: center;
  padding: 8px 21px;
  color: #000000;
  font-size: 25px;
  background: #ffffff;
  border: 1px solid #000000;
  cursor: pointer;
`

const FilterContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1; /* 남은 공간을 모두 차지하도록 설정 */
  overflow-y: auto; /* 내용이 넘치면 세로 스크롤 생성 */
  gap: 33px;
  padding: 0 24px 20px;
  
  /* 스크롤바 디자인 */
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #b0d8b3;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
`

const FilterGroup = styled.section`
  display: flex;
  flex-direction: column;
  gap: 13px;
`

const GroupTitle = styled.h3`
  margin: 0;
  color: #000000;
  font-size: 30px;
  font-weight: 500;
`

const Options = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 13px 18px;
`

const Option = styled.button`
  padding: 7px 18px;
  color: #000000;
  font-size: 30px;
  line-height: normal;
  background: ${({ $selected }) =>
    $selected ? 'var(--green-light)' : '#ffffff'};
  border: 2px solid var(--green-dark);
  border-radius: 30px;
  cursor: pointer;
`

function Filter({ onClose, selectedOptions, onChange }) {
  const toggleOption = (option) => {
    const nextOptions = new Set(selectedOptions)

    if (nextOptions.has(option)) {
      nextOptions.delete(option)
    } else {
      nextOptions.add(option)
    }

    onChange(nextOptions)
  }

  return (
    <Backdrop onMouseDown={onClose}>
      <Modal
        role="dialog"
        aria-modal="true"
        aria-labelledby="filter-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <ModalHeader>
          <Title id="filter-title">필터</Title>
          <IconButton type="button" aria-label="필터 닫기" onClick={onClose}>
            <AiOutlineClose size={40} />
          </IconButton>
        </ModalHeader>

        <ResetRow>
          <ResetButton type="button" onClick={() => onChange(new Set())}>
            <GrPowerReset size={30} />
            초기화
          </ResetButton>
        </ResetRow>

        <FilterContent>
          {FILTER_GROUPS.map(({ title, options }) => (
            <FilterGroup key={title}>
              <GroupTitle>{title}</GroupTitle>
              <Options>
                {options.map((option) => {
                  const isSelected = selectedOptions.has(option)

                  return (
                    <Option
                      key={option}
                      type="button"
                      $selected={isSelected}
                      aria-pressed={isSelected}
                      onClick={() => toggleOption(option)}
                    >
                      {option}
                    </Option>
                  )
                })}
              </Options>
            </FilterGroup>
          ))}
        </FilterContent>
      </Modal>
    </Backdrop>
  )
}

export default Filter
