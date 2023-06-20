import { useRecoilState } from 'recoil';
import { modalState } from '../store/atom/modalAtom';
import { useCallback, useEffect } from 'react';

export const useModal = () => {
  const [modalDataState, setModalDataState] = useRecoilState(modalState);

  const openModal = useCallback(
    (title: string, content: React.ReactNode | string) => {
      const modalData = {
        title,
        content,
        isOpen: true
      };
      setModalDataState(modalData);
    },
    [setModalDataState]
  );

  const closeModal = () => {
    setModalDataState({ ...modalDataState, isOpen: false });
  };

  return { modalDataState, openModal, closeModal };
};
