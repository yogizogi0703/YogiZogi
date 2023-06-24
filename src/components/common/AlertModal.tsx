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
            <label
              htmlFor="my_modal_6"
              className="btn"
              onClick={() => {
                additionalHandler?.();
                handleModal(false);
              }}
            >
              닫기
            </label>
          </div>
        </div>
        <label
          className="modal-backdrop"
          htmlFor="alertModal"
          onClick={() => {
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
