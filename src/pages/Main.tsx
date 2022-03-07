import React, { useState } from 'react';
import styled from '@emotion/styled';
import ListCard from '../components/ListCard';
import { ListData } from '../components/ListCard';

// fetch data -> item 예시
const items: ListData[] = [
  {
    id: 1,
    휴양림_명칭: '속리산숲체험휴양마을',
    휴양림_주소: '충청북도 보은군 속리산면 속리산로 596',
    전화번호: '043-540-3220',
  },
  {
    id: 2,
    휴양림_명칭: '속리산숲체험휴양마을',
    memo: '추울때 가야 좋은곳',
    휴양림_주소: '충청북도 보은군 속리산면 속리산로 596',
    전화번호: '043-540-3220',
  },
];

const Main = (props: any) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  console.log('isEditing:', isEditing);

  return (
    <>
      <SearchBar>
        <SelectOption>
          <option>이름</option>
          <option>주소</option>
          <option>메모</option>
        </SelectOption>
        <SearchInput type="text" placeholder="검색어를 입력해주세요" />
      </SearchBar>
      <SavedItem>
        {/* <div>list section...</div> */}
        {items.map((item: ListData, index: number) => (
          <ListCard key={index} data={item} setIsEditing={setIsEditing} />
        ))}
      </SavedItem>
    </>
  );
};

export default Main;

const SearchBar = styled.header`
  width: 358px;
  height: 50px;
  box-shadow: 0px 2px 2px 0px #aeaeae;
  display: flex;
  flex-direction: row;
  position: fixed;
`;

const SelectOption = styled.select`
  width: 25%;
  background-color: white;
  height: 100%;
  border: none;
  border-right: 1px solid #ddd;
  font-size: 16px;
`;

const SearchInput = styled.input`
  width: 75%;
  background-color: white;
  height: 100%;
  border: none;
  padding-left: 10px;
  font-size: 16px;
`;

const SavedItem = styled.ul`
  width: 90%;
  height: 100%;
  margin: auto;
  padding-top: 60px;
  margin-bottom: 100px;
`;
