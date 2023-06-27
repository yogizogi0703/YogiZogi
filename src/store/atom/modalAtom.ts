import { atom } from 'recoil';

export interface ModalStateProps {
  isOpen: boolean;
  content: React.ReactNode | string;
  btnTitle?: string;
  handleBtnClick?: () => void;
}

const initialize: ModalStateProps = {
  isOpen: false,
  content: ''
};

export const modalState = atom({
  key: 'modalState',
  default: initialize
});
