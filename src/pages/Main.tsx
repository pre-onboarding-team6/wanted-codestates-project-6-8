import React, { ChangeEvent, useContext, useState } from 'react';
import styled from '@emotion/styled';
import NotificationCenter from '../components/NotificationCenter';
import ListCard from '../components/ListCard';
import { IlistWithMemo, ListContext } from '../contexts/ListContext';
import Modal from '../components/Modal';
import { ScrollProps } from './List';
import MoreData from '../components/MoreData';

interface Option {
  value: string;
  label: string;
  key: '휴양림_명칭' | '휴양림_주소' | 'memo';
}

const options: Option[] = [
  { value: 'name', label: '이름', key: '휴양림_명칭' },
  { value: 'address', label: '주소', key: '휴양림_주소' },
  { value: 'memo', label: '메모', key: 'memo' },
];

const initialIdata = {
  id: 2,
  memo: '추울때 가야 좋은 곳',
  경도: '',
  관할: '',
  기준일: '',
  위도: '',
  전화번호: '',
  휴양림_명칭: '',
  휴양림_주소: '',
};

const Main = ({ setScrollLock }: ScrollProps) => {
  const { list } = useContext(ListContext);

  const [selectedOption, setSelectedOption] = useState<Option>(options[0]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [savedList, setSavedList] = useState<IlistWithMemo[]>(list);
  const [displayList, setDisplayList] = useState<IlistWithMemo[]>(list);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [clickedItem, setClickedItem] = useState<IlistWithMemo>(initialIdata);

  const changeSelectValue = (e: ChangeEvent) => {
    const { value } = e.target as HTMLSelectElement;
    setSelectedOption(options[Number(value)]);
  };

  const changeSearchValue = (e: ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    setSearchValue(value);
  };

  const searchList = () => {
    const { key } = selectedOption;
    let newList = [...savedList];
    newList = newList.filter((item: IlistWithMemo) =>
      item[key].includes(searchValue),
    );
    setDisplayList(newList);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <MainContainer>
      <HeaderContainer>
        <InputContainer>
          <Select onChange={changeSelectValue}>
            {options.map(({ label }, idx) => (
              <option value={idx} key={idx}>
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
        <ButtonContainer>
          <MoreData />
        </ButtonContainer>
      </HeaderContainer>
      <ListContainer>
        {displayList.length > 0 ? (
          displayList.map((item) => (
            <ListCard
              key={item.id}
              data={item}
              setOpenModal={setOpenModal}
              setClickedItem={setClickedItem}
              setIsEditing={setIsEditing}
            />
          ))
        ) : (
          <div>저장된 휴양림 데이터가 없습니다.</div>
        )}
      </ListContainer>
      <NotificationCenter />
      <Modal
        show={openModal}
        setShowModal={setOpenModal}
        useDelete
        closeModal={handleCloseModal}
        data={clickedItem}
        setScrollLock={setScrollLock}
      />
    </MainContainer>
  );
};

export default Main;

const MainContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const HeaderContainer = styled.header`
  width: 358px;
  box-shadow: 0px 2px 2px 0px #aeaeae;
  display: flex;
  flex-direction: column;
  position: fixed;
  background: white;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  width: 100%;
  padding: 0.5rem;
`;

const ButtonContainer = styled.div`
  padding: 0.5rem;
  padding-top: 0;
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
  padding-top: 80px;
`;
