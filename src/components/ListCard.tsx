import styled from '@emotion/styled';

export interface ListData {
  id?: number;
  휴양림_명칭: string;
  memo?: string;
  휴양림_주소: string;
  전화번호: string;
}

interface Iprops {
  data: ListData;
  setOpenModal?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditing?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ListCard = (props: Iprops) => {
  const { data, setOpenModal, setIsEditing } = props;
  const { id, 휴양림_명칭, memo, 휴양림_주소, 전화번호 } = data;

  const selectItem = () => {
    console.log('select');
    setOpenModal && setOpenModal(true);
  };

  const editCard = () => {
    console.log('edit');
    setIsEditing && setIsEditing(true);
  };

  return (
    <ListContainer onClick={setOpenModal ? selectItem : editCard}>
      <button role={'listitem'}>
        <Name>{휴양림_명칭}</Name>
        <Address>{휴양림_주소}</Address>
        <Contact>{전화번호}</Contact>
        {memo && <Memo>{memo}</Memo>}
      </button>
    </ListContainer>
  );
};

export default ListCard;

const ListContainer = styled.li`
  width: 100%;
  height: auto;
  margin-top: 10px;
  border: 1px solid #ddd;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
  button {
    witdh: 100%;
    height: 100%;
    display: block;
    padding: 10px 15px;
    text-align: inherit;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
`;

const Name = styled.span`
  line-height: 20px;
  margin-top: 5px;
  display: block;
  font-weight: 600;
`;

const Address = styled.span`
  line-height: 18px;
  margin-top: 3px;
  display: block;
  font-size: 14px;
`;

const Contact = styled.span`
  line-height: 18px;
  margin-top: 3px;
  display: block;
  font-size: 14px;
`;

const Memo = styled.span`
  font-weight: 600;
  line-height: 20px;
  margin-top: 5px;
  display: block;
  color: #e1514a;
`;
