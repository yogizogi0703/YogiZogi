import { useRef, useEffect } from 'react';
import { ModalText } from './constants';
import { ModalTextTypes } from './types';
import CancelModal from './CancelModal';
import ReviewModal from './ReviewModal';

interface IModalTriggerButton {
  disabled: boolean;
  text: ModalTextTypes;
  accommodationId: number;
  bookId: number;
}

const ModalTriggerButton = ({
  disabled,
  text,
  accommodationId,
  bookId
}: IModalTriggerButton) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const closeModal = () => {
    if (!modalRef) return;
    modalRef.current?.close();
  };

  const openModal = () => {
    if (!modalRef) return;
    modalRef.current?.showModal();
  };

  useEffect(() => {
    modalRef.current?.addEventListener('cancel', (e) => {
      e.preventDefault();
    });
  });

  return (
    <div>
      <button
        className={`btn text-white text-xs p-0 min-h-0 h-10 w-24 ${
          disabled ? 'btn-disabled' : 'bg-red-500 hover:bg-red-600'
        }`}
        onClick={openModal}
      >
        {text}
      </button>
      <dialog ref={modalRef} className="modal">
        <div className="w-full h-full bg-transparent pt-20 overflow-auto flex justify-center">
          <div
            className={`bg-white rounded-xl w-11/12 min-w-[22rem] max-w-[32rem] ${
              text === ModalText.REVIEW ? 'h-[37rem]' : 'h-[22rem]'
            }`}
          >
            {text === ModalText.CANCEL ? (
              <CancelModal bookId={bookId} onClose={closeModal} />
            ) : text === ModalText.REVIEW ? (
              <ReviewModal
                accommodationId={accommodationId}
                bookId={bookId}
                onClose={closeModal}
              />
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ModalTriggerButton;
