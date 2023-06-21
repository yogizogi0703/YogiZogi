interface IComparisonModal {
  modalState: boolean;
  handleModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const ComparisonModal = ({modalState, handleModal} : IComparisonModal) => {
  return (
    <>
      <input
        type="checkbox"
        id="alertModal"
        className="modal-toggle"
        checked={modalState}
        onChange={() => handleModal(!modalState)}
      />
      <div className="modal">
        <div className="modal-box">
          <p className="py-4 text-lg"></p>
          <div className="modal-action">
            <label
              htmlFor="my_modal_6"
              className="btn"
              onClick={() => handleModal(false)}
            >
              닫기
            </label>
          </div>
        </div>
        <label
          className="modal-backdrop"
          htmlFor="alertModal"
          onClick={() => handleModal(false)}
        >
          Close
        </label>
      </div>
    </>
  );
};
