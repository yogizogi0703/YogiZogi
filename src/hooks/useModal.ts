import { useRecoilState } from 'recoil';
import { ModalStateProps, modalState } from '../store/atom/modalAtom';
import { useCallback } from 'react';

interface OpenModalBtnProps {
  content: React.ReactNode | string;
  btnTitle?: string;
  handle?: () => void;
}

const useModal = () => {
  const [modalDataState, setModalDataState] =
    useRecoilState<ModalStateProps>(modalState);

  const openModal = useCallback(
    ({ content, btnTitle, handle }: OpenModalBtnProps) => {
      const modalData = {
        content,
        isOpen: true,
        btnTitle: btnTitle,
        handleBtnClick: handle
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

export default useModal;
