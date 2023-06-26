import useModal from '../../hooks/useModal';

const Modal = () => {
  const { modalDataState, closeModal } = useModal();

  const handleBtnOnClick = () => {
    if (modalDataState.handleBtnClick) modalDataState.handleBtnClick();
    closeModal();
  };

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
              className="absolute flex flex-col justify-between gap-6 top-1/2 left-1/2 p-6 w-auto min-w-[464px] h-auto bg-white rounded-2xl -translate-x-1/2 -translate-y-1/2"
              onClick={(e) => e.stopPropagation()}
            >
              {typeof modalDataState.content === 'string' ? (
                <p className="py-4 text-lg">{modalDataState.content}</p>
              ) : (
                modalDataState.content
              )}
              <div className="flex items-center justify-end gap-2">
                {modalDataState.btnTitle && (
                  <button
                    className="btn bg-teal-500 hover:bg-teal-600 border-teal-50 hover:border-teal-600 text-white"
                    onClick={handleBtnOnClick}
                  >
                    {modalDataState.btnTitle}
                  </button>
                )}
                <button className="btn" onClick={closeModal}>
                  닫기
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Modal;
