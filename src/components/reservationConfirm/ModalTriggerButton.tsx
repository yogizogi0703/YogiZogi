import { useState } from 'react';
import { ModalText } from './constants';
import { ModalTextTypes } from './types';
import CancelModal from './CancelModal';
import ReviewModal from './ReviewModal';
import { AiOutlineClose } from 'react-icons/ai';

interface IModalTriggerButton {
  disabled: boolean;
  text: ModalTextTypes;
  accommodationId: number;
  bookId?: number;
}

const ModalTriggerButton = ({
  disabled,
  text,
  accommodationId,
  bookId
}: IModalTriggerButton) => {
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  return (
    <div>
      <button
        className={`btn text-white text-xs p-0 min-h-0 h-10 w-24 ${
          disabled ? 'btn-disabled bg-gray-600' : 'bg-red-500 hover:bg-red-600'
        }`}
        onClick={openModal}
      >
        {text}
      </button>
      <div
        className={`fixed top-0 left-0 w-full h-screen z-[200]${
          modalOpen ? '' : ' hidden'
        }`}
      >
        <div className="absolute bg-white w-[80%] md:w-[40rem] rounded z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {text === ModalText.CANCEL ? (
            <CancelModal bookId={bookId} onClose={closeModal} />
          ) : text === ModalText.REVIEW ? (
            <ReviewModal
              accommodationId={accommodationId}
              onClose={closeModal}
            />
          ) : (
            <div></div>
          )}
        </div>
        <div className="bg-gray-300 opacity-50 w-full h-full absolute top-0 left-0 z-10"></div>
      </div>
    </div>
  );
};

export default ModalTriggerButton;
