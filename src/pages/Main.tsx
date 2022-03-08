import React, { ChangeEvent, useState, useContext, useEffect } from 'react';
import styled from '@emotion/styled';
import NotificationCenter from '../components/NotificationCenter';
import { IlistWithMemo, ListContext } from '../contexts/ListContext';
import ListCard from '../components/ListCard';
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

// 임시 데이터
const tempdata = {
  id: 2,
  휴양림_명칭: '속리산숲체험휴양마을',
  memo: '추울때 가야 좋은 곳',
  휴양림_주소: '충청북도 보은군 속리산면 속리산로 596',
  전화번호: '043-540-3220',
};

const Main = () => {
  const [selectedOption, setSelectedOption] = useState<Option>(options[0]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [savedList, setSavedList] = useState<IlistWithMemo[]>([]);
  const [displayList, setDisplayList] = useState<IlistWithMemo[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem('list') as string);
    setSavedList(list);
    setDisplayList(list);
  }, []);

  console.log('[Main]isEditing', isEditing);

  const { list, addList, deleteList, editList } = useContext(ListContext);
  console.log('[Main]list:', list);

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
          displayList.map((item, idx) => (
            <ListCard
              key={idx}
              data={item}
              setIsEditing={setIsEditing}
            ></ListCard>
          ))
        ) : (
          <div>저장된 휴양림 데이터가 없습니다.</div>
        )}
      </ListContainer>
      <NotificationCenter />
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
