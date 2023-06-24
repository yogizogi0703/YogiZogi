interface IAlertModal {
  content: string;
  modalState: boolean;
  handleModal: React.Dispatch<React.SetStateAction<boolean>>;
  additionalHandler?: () => void;
}

export const AlertModal = ({
  content,
  modalState,
  handleModal,
  additionalHandler
}: IAlertModal) => {
  return (
    <>
      <input
        type="checkbox"
        id="alertModal"
        className="modal-toggle"
        checked={modalState}
        onChange={() => {
          additionalHandler?.();
          handleModal(!modalState);
        }}
      />
      <div className="modal">
        <div className="modal-box">
          <p className="py-4 text-lg">{content}</p>
          <div className="modal-action">
            <button
              className="btn"
              onClick={(e) => {
                e.preventDefault();
                additionalHandler?.();
                handleModal(false);
              }}
            >
              닫기
            </button>
          </div>
        </div>
        <label
          className="modal-backdrop"
          htmlFor="alertModal"
          onClick={(e) => {
            e.preventDefault();
            additionalHandler?.();
            handleModal(false);
          }}
        >
          Close
        </label>
      </div>
    </>
  );
};
