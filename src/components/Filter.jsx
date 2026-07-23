import { AiOutlineClose } from 'react-icons/ai'
import { GrPowerReset } from 'react-icons/gr'
import styled from 'styled-components'

const FILTER_GROUPS = [
  { title: '카테고리', options: ['이과', '문과'] },
  { title: '세부 카테고리', options: ['수학', '과학', '보건', '생명', 'IT'] },
  { title: '학년', options: ['1학년', '2학년'] },
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
  padding: 36px 24px 48px;
  overflow: hidden;
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
  gap: 33px;
  padding: 0 24px;
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
