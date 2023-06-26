import { DraggableAccommodationList } from './DraggableAccommodationList';

interface IComparisonModal {
  modalState: boolean;
  handleModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ComparisonModal = ({
  modalState,
  handleModal
}: IComparisonModal) => {
  const criteria = ['가격', '평점', '위치', '편의시설'];

  return (
    <>
      <input
        type="checkbox"
        id="comparisonModal"
        className="modal-toggle"
        checked={modalState}
        onChange={() => handleModal(!modalState)}
      />
      <div className="modal">
        <div className="modal-box md:w-[600px] max-w-full h-fit overflow-hidden">
          <div className="overflow-x-auto">
            <h2 className="mb-3 text-2xl font-semibold text-center">
              한 눈에 비교하기
            </h2>
            <div className="flex w-full">
              <div className="flex flex-col w-1/5 text-center font-semibold gap-y-1 text-xs md:text-base">
                <p className="h-32"></p>
                <p className="h-4 md:h-6"></p>
                {criteria.map((el, idx) => {
                  return (
                    <p
                      key={idx}
                      className={`px-1 ${idx % 2 === 0 ? 'bg-gray-300' : ''}`}
                    >
                      {el}
                    </p>
                  );
                })}
              </div>
              <DraggableAccommodationList />
            </div>
          </div>
          <div className="modal-action">
            <button
              className="btn btn-outline btn-sm text-sm"
              onClick={() => handleModal(false)}
            >
              닫기
            </button>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="comparisonModal">
          Close
        </label>
      </div>
    </>
  );
};
