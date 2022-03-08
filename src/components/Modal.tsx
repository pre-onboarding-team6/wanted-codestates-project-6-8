import React, { useCallback, useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ScrollProps } from '../pages/List';

interface Props extends ScrollProps {
  show: boolean;
  closeModal: () => void;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  useDelete?: boolean;
  accomName?: string;
  accomAddress?: string;
  accomNumber?: string;
  memo?: string;
  setScrollLock: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Modal({
  show,
  closeModal,
  setShowModal,
  useDelete = false,
  accomName,
  accomAddress,
  accomNumber,
  memo,
  setScrollLock,
}: Props) {
  const [prevActiveEl, setPrevActiveEl] = useState<Element | null>();
  const [nextOfPrevActiveEl, setNextOfPrevActiveEl] =
    useState<Element | null>();
  const [lastFocusableEl, setLastFocusableEl] = useState<Element>();
  const contentRef = useRef<HTMLDivElement>(null);
  const inputMemoRef = useRef<HTMLInputElement>(null);
  const firstFocusTrap = useRef<HTMLDivElement>(null);
  const lastFocusTrap = useRef<HTMLDivElement>(null);

  const closeModalAndFocusPrev = useCallback(() => {
    setShowModal(false);
    if (prevActiveEl) {
      (prevActiveEl as HTMLElement)?.focus();
    } else {
      (nextOfPrevActiveEl as HTMLElement)?.focus();
    }
  }, [setShowModal, prevActiveEl, nextOfPrevActiveEl]);

  const escapeClose = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        closeModalAndFocusPrev();
      }
    },
    [closeModalAndFocusPrev],
  );

  const setLastFocus = useCallback(() => {
    if (!contentRef.current) return;

    const focusableEls = Array.from(
      contentRef.current.querySelectorAll(
        'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])',
      ),
    ).filter(
      (el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'),
    );

    const lastEl = focusableEls[focusableEls.length - 1];

    if (lastEl) {
      setLastFocusableEl(lastEl);
    }
  }, [contentRef]);

  useEffect(() => {
    if (show && document.activeElement?.tagName === 'LI') {
      setPrevActiveEl(document.activeElement);
      setNextOfPrevActiveEl(document.activeElement.nextElementSibling);
      inputMemoRef.current?.focus();
      setLastFocus();
    }

    setScrollLock(show ? true : false);
    document.documentElement.addEventListener('keydown', escapeClose);
    return () => {
      document.documentElement.removeEventListener('keydown', escapeClose);
    };
  }, [show, escapeClose, setLastFocus, setScrollLock]);

  const focusLastEl = useCallback(
    (e) => {
      if (e.target === firstFocusTrap.current) {
        if (lastFocusableEl) {
          (lastFocusableEl as HTMLElement)?.focus();
        }
      }
    },
    [firstFocusTrap, lastFocusableEl],
  );

  const focusFirstEl = useCallback(
    (e) => {
      if (e.target === lastFocusTrap.current) {
        inputMemoRef.current?.focus();
      }
    },
    [lastFocusTrap],
  );

  useEffect(() => {
    const focusHead = firstFocusTrap.current;
    const focusFoot = lastFocusTrap.current;
    if (focusHead) {
      focusHead.addEventListener('focusin', focusLastEl);
    }
    if (focusFoot) {
      focusFoot.addEventListener('focusin', focusFirstEl);
    }
    return () => {
      if (focusFoot) {
        focusFoot.removeEventListener('focusin', focusLastEl);
      }
      if (focusHead) {
        focusHead.removeEventListener('focusin', focusFirstEl);
      }
    };
  }, [show, focusFirstEl, focusLastEl]);

  const saveItemWithMemo = (
    e: React.MouseEvent<HTMLFormElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (!inputMemoRef.current?.value) {
      console.error('메모를 입력해주세요.');
      return;
    }

    console.log(inputMemoRef.current?.value);
    closeModalAndFocusPrev();
  };

  const deleteItem = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log('delete');
    closeModalAndFocusPrev();
  };

  return show ? (
    <ModalContainer ref={contentRef} onClick={closeModal}>
      <ModalContent
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div ref={firstFocusTrap} tabIndex={0} />
        <Title>이름</Title>
        <Content>{accomName ?? '속리산숲체험휴양마을'}</Content>
        <Title>주소</Title>
        <Content>
          {accomAddress ?? '충청북도 보은군 속리산면 속리산로 596'}
        </Content>
        <Title>연락처</Title>
        <Content>{accomNumber ?? '043-540-3220'}</Content>
        <Title>메모</Title>
        <Form onSubmit={saveItemWithMemo}>
          <InputMemo ref={inputMemoRef} placeholder="내용을 입력해주세요" />
          <ButtonWrapper>
            {useDelete && (
              <Button
                type="button"
                colorType="red"
                onClick={(e) => deleteItem(e)}
              >
                삭제
              </Button>
            )}
            <Button colorType="green" type="submit">
              저장
            </Button>
          </ButtonWrapper>
        </Form>
        <div ref={lastFocusTrap} tabIndex={0} />
      </ModalContent>
    </ModalContainer>
  ) : null;
}

const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.3);
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 12px;
  border-radius: 5px;
`;

const Title = styled.h3`
  font-size: 16px;
  user-select: none;
`;

const Content = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin: 4px 0 16px;
`;

const Form = styled.form`
  width: 100%;
`;

const InputMemo = styled.input`
  font-size: 16px;
  font-weight: 600;
  padding: 8px 10px;
  margin: 4px 0 16px;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
`;

const Button = styled.button<{ colorType: string }>`
  flex: 1;
  border: none;
  padding: 8px 12px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 5px;
  color: white;
  background-color: ${({ colorType }) => css`
    ${colorType}
  `};
  cursor: pointer;
`;
