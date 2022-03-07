import ListCard from '../components/ListCard';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ListData } from '../components/ListCard';

// fetch data -> item 예시
const items : ListData[] = [{
  id: 1,
  name: '속리산숲체험휴양마을',
  address: '충청북도 보은군 속리산면 속리산로 596',
  contact: '043-540-3220'
}, {
  id: 2,
  name: '속리산숲체험휴양마을',
  memo: '추울때 가야 좋은곳', 
  address: '충청북도 보은군 속리산면 속리산로 596',
  contact: '043-540-3220'
}]

const List = () => {
  const [openModal, setOpenModal] = useState(false)
  const navigate = useNavigate()

  console.log('openModal:',openModal)

  const goToMain = () => {
    navigate('/')
  }

  return <>
  <NavigationBar>
    <PrevButton onClick={goToMain}>
      <Icon src="/prev.png" alt="prev"/>
    </PrevButton>
  </NavigationBar>
  <ListContainer>
    {items.map((item:ListData, index:number) => <ListCard key={index} data={item} setOpenModal={setOpenModal} />)}
  </ListContainer>
  </>
}

export default List;

const NavigationBar = styled.header`
  width: 358px;
  height: 50px;
  box-shadow: 0px 2px 2px 0px #aeaeae;
  display: flex;
  flex-direction: row;
  position: fixed;
  background: white;
`

const PrevButton = styled.button`
  width: 50px;
  height: 50px;
  border: none;
  cursor: pointer;
  background-color: white;
`

const Icon = styled.img`
  width: 50%;
  height: 50%;
`

const ListContainer = styled.ul`
  width: 90%;
  height: 100%;
  margin: auto;
  padding-top: 60px;
`