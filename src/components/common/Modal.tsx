import { useModal } from '../../hooks/useModal';
import React from 'react';

const Modal = () => {
  const { modalDataState, closeModal } = useModal();

  return (
    <>
      {modalDataState.isOpen && (
        <>
          <div
            id="background"
            className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-25 z-40"
            onClick={closeModal}
          >
            <div
              className="absolute top-1/2 left-1/2 p-4 w-auto h-auto bg-white rounded-xl -translate-x-1/2 -translate-y-1/2"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-2">
                <h1 className=" text-lg font-semibold">
                  {modalDataState.title}
                </h1>
                <button className="btn btn-ghost" onClick={closeModal}>
                  닫기
                </button>
              </div>
              {modalDataState.content}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Modal;
