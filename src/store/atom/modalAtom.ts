import { atom } from 'recoil';

interface ModalStateProps {
  isOpen: boolean;
  title: string;
  content: React.ReactNode | string;
}

const initialize: ModalStateProps = {
  isOpen: false,
  title: '',
  content: ''
};

export const modalState = atom({
  key: 'modalState',
  default: initialize
});
