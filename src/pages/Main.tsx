import React, { ChangeEvent, useContext, useState } from 'react';
import styled from '@emotion/styled';
import NotificationCenter from '../components/NotificationCenter';
import ListCard, { ListData } from '../components/ListCard';
import { ListContext } from '../contexts/ListContext';
import Modal from '../components/Modal';
import { ScrollProps } from './List';

const options: { value: string; label: string }[] = [
  { value: 'name', label: '이름' },
  { value: 'address', label: '주소' },
  { value: 'memo', label: '메모' },
];

const Main = ({ setScrollLock }: ScrollProps) => {
  const [selectedOption, setSelectedOption] = useState<
    'name' | 'address' | 'memo'
  >('name');
  const [searchValue, setSearchValue] = useState<string>('');
  const { list } = useContext(ListContext);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [clickedItem, setClickedItem] = useState<ListData>({
    id: 0,
    휴양림_명칭: '',
    memo: '',
    휴양림_주소: '',
    전화번호: '',
  });

  const changeSelectValue = (e: ChangeEvent) => {
    const { value } = e.target as HTMLSelectElement;
    if (value === 'name' || value === 'address' || value === 'memo') {
      setSelectedOption(value);
    }
  };

  const changeSearchValue = (e: ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    setSearchValue(value);
  };

  const searchList = () => {
    // selectedOption
    // searchValue
    // 옵션과 검색어로 리스트를 필터링
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Container>
      <MainContainer>
        <InputContainer>
          <Select onChange={changeSelectValue}>
            {options.map(({ label, value }, idx) => (
              <option value={value} key={idx}>
                {label}
              </option>
            ))}
          </Select>
          <Input
            type="text"
            value={searchValue}
            onChange={changeSearchValue}
            placeholder="검색어를 입력해주세요"
            onKeyUp={(e) => {
              if (e.key === 'Enter') searchList();
            }}
          />
        </InputContainer>
        <ListContainer>
          {list.map((item) => (
            <ListCard
              key={item.id}
              data={item}
              setOpenModal={setOpenModal}
              setClickedItem={setClickedItem}
            />
          ))}
        </ListContainer>
        <NotificationCenter />
      </MainContainer>
      <Modal
        show={openModal}
        setShowModal={setOpenModal}
        useDelete
        closeModal={handleCloseModal}
        data={clickedItem}
        setScrollLock={setScrollLock}
      />
    </Container>
  );
};

export default Main;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
`;

const MainContainer = styled.div`
  position: relative;
  width: 360px;
  height: 812px;
  border: 1px solid gray;
  overflow: hidden;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  height: 4rem;
  padding: 0.5rem;
`;

const Select = styled.select`
  height: 100%;
  padding: 0rem 0.7rem;
  margin-right: 0.5rem;
  font-size: 1rem;
`;

const Input = styled.input`
  height: 100%;
  flex: 1;
  font-size: 1rem;
  padding-left: 0.5rem;
`;

const ListContainer = styled.ul`
  padding: 0.5rem;
`;

const Item = styled.li`
  background: green;
`;
