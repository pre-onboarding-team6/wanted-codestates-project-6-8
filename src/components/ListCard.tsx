import styled from '@emotion/styled';

export interface ListData {
  id: number,
  name: string,
  memo?: string,
  address: string,
  contact: string
}

interface Iprops {
  data: ListData
  setOpenModal?: any
  setIsEditing?:any
}

const ListCard = (props: Iprops) => {
  const { data, setOpenModal, setIsEditing } = props;
  const { id, name, memo, address, contact } = data;

  const selectItem = () => {
    console.log('select')
    setOpenModal(true)
  }

  const editCard = () => {
    console.log('edit')
    setIsEditing(true)

  }

  return <ListContainer onClick={setOpenModal ? selectItem : editCard}>
    <Name>{name}</Name>
    <Address>{address}</Address>
    <Contact>{contact}</Contact>
    {memo && <Memo>{memo}</Memo>}
  </ListContainer>
}

export default ListCard;

const ListContainer = styled.li`
  width: 100%;
  height: auto;
  padding: 10px 15px;
  margin-top: 10px;
  border: 1px solid #ddd;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  &:hover {
    background-color: #f0f0f0;
    cursor: pointer;
  }
`

const Name = styled.span`
  line-height: 20px;
  margin-top: 5px;
  display: block;
  font-weight: 600;
`

const Address = styled.span`
  line-height: 18px;
  margin-top: 3px;
  display: block;
  font-size: 14px;
`

const Contact = styled.span`
  line-height: 18px;
  margin-top: 3px;
  display: block;
  font-size: 14px;
`

const Memo = styled.span`
  font-weight: 600;
  line-height: 20px;
  margin-top: 5px;
  display: block;
  color: #E1514a;
`