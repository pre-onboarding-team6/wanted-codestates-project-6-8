import styled from '@emotion/styled';

type ListData = {
  name: string,
  memo?: string,
  address: string,
  contact: string | number
}

const ListCard = (props:any) => {
  const { name, memo, address, contact } = props.data;

  const selectItem = () => {
    console.log('select')
    props.setOpenModal(true)
  }

  const editCard = () => {
    console.log('edit')
    props.setIsEditing(true)

  }

  return <ListContainer onClick={props.setOpenModal ? selectItem : editCard}>
    <Name>이름: {name}</Name>
    <Address>주소: {address}</Address>
    <Contact>연락처: {contact}</Contact>
    {memo && <Memo>메모: {memo}</Memo>}
  </ListContainer>
}

export default ListCard;

const ListContainer = styled.li`
  width: 100%;
  height: auto;
  padding: 5px 15px;
  margin-top: 10px;
  border: 1px solid #ddd;
  border-radius: 20px;
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
`

const Address = styled.span`
  line-height: 20px;
  margin-top: 5px;
  display: block;
`

const Contact = styled.span`
  line-height: 20px;
  margin-top: 5px;
  display: block;
`

const Memo = styled.span`
  font-weight: 600;
  line-height: 20px;
  margin-top: 5px;
  display: block;
  color: #1a3563;
`