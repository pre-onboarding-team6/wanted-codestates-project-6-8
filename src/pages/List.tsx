import ListCard from '../components/ListCard';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import { useInView } from 'react-intersection-observer';
import Modal from '../components/Modal';
import { Ilist, IlistWithMemo } from '../contexts/ListContext';

export interface ScrollProps {
  setScrollLock: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialIdata = {
  id: 0,
  memo: '',
  경도: '',
  관할: '',
  기준일: '',
  위도: '',
  전화번호: '',
  휴양림_명칭: '',
  휴양림_주소: '',
};

const List = ({ setScrollLock }: ScrollProps) => {
  const [ref, inView] = useInView();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadFinished, setLoadFinished] = useState<boolean>(false);
  const [items, setItems] = useState<IlistWithMemo[]>([]);
  const [page, setPage] = useState<number>(1);
  const [clickedItem, setClickedItem] = useState<IlistWithMemo>(initialIdata);
  const SERVICE_KEY = process.env.REACT_APP_SERVICE_KEY;
  const navigate = useNavigate();

  console.log('openModal:', openModal);

  const loadData = useCallback(async () => {
    try {
      await axios
        .get(
          `https://api.odcloud.kr/api/15099285/v1/uddi:57e7fc08-b32c-482d-8dc7-ab02864a70b7?serviceKey=${SERVICE_KEY}&page=${page}&perPage=10&returnType=JSON`,
        )
        .then((res) => {
          const jsonRes = res.data.data;
          setItems((prev: IlistWithMemo[]) => [...prev, ...jsonRes]);
          if (jsonRes.length < 10) {
            setLoadFinished(true);
          }
        });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [page]);

  const goToMain = () => {
    navigate('/');
  };

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (inView && !loading && !loadFinished) {
      setPage((prev) => prev + 1);
    }
  }, [inView, loading]);

  console.log(page);
  console.log(items);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return !loading ? (
    <>
      <NavigationBar>
        <PrevButton onClick={goToMain}>
          <Icon src="/prev.png" alt="prev" />
        </PrevButton>
      </NavigationBar>
      <ListContainer>
        {items.map((item: IlistWithMemo, index: number) => (
          <React.Fragment key={index}>
            {items.length - 1 === index ? (
              <div ref={ref}>
                <ListCard
                  key={index}
                  data={item}
                  setOpenModal={setOpenModal}
                  setClickedItem={setClickedItem}
                />
              </div>
            ) : (
              <div>
                <ListCard
                  key={index}
                  data={item}
                  setOpenModal={setOpenModal}
                  setClickedItem={setClickedItem}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </ListContainer>
      <Modal
        show={openModal}
        setShowModal={setOpenModal}
        closeModal={handleCloseModal}
        setScrollLock={setScrollLock}
        data={clickedItem}
      />
    </>
  ) : (
    <Loader />
  );
};

export default List;

const NavigationBar = styled.header`
  width: 358px;
  height: 50px;
  box-shadow: 0px 2px 2px 0px #aeaeae;
  display: flex;
  flex-direction: row;
  position: fixed;
  background: white;
`;

const PrevButton = styled.button`
  width: 50px;
  height: 50px;
  border: none;
  cursor: pointer;
  background-color: white;
`;

const Icon = styled.img`
  width: 50%;
  height: 50%;
`;

const ListContainer = styled.ul`
  width: 90%;
  height: 100%;
  margin: auto;
  padding-top: 60px;
`;
