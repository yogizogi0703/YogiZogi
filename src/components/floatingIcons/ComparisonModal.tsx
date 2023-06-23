import { useRecoilState } from 'recoil';
import { selectedAccommodation } from '../../store/atom/comparisonAtom';
import { addCommasToPrice } from '../../helpers';
import RatingStars from '../../components/common/RatingStars';
import { Link } from 'react-router-dom';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult
} from 'react-beautiful-dnd';

interface IComparisonModal {
  modalState: boolean;
  handleModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ComparisonModal = ({
  modalState,
  handleModal
}: IComparisonModal) => {
  const [selectedAcc, setSelectedAcc] = useRecoilState(selectedAccommodation);
  const criteria = ['가격', '평점', '위치', '편의시설'];

  const minPrice = Math.min(...selectedAcc.map((el) => el.price));
  const highRate = Math.max(...selectedAcc.map((el) => el.rate));

  const urlParams = new URLSearchParams(
    '?' + window.location.hash.split('?')[1]
  );

  const {
    checkindate: checkInDate,
    checkoutdate: checkOutDate,
    people: people
  } = Object.fromEntries(urlParams.entries());

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(selectedAcc);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSelectedAcc(items);
  };

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
        <div className="modal-box w-[600px] max-w-[900px] overflow-hidden">
          <div>
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
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable
                  droppableId="selectedAccommodations"
                  direction="horizontal"
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="flex gap-y-1 text-center w-full text-xs md:text-base"
                    >
                      {selectedAcc.map((el, idx) => (
                        <Draggable
                          draggableId={el.id.toString()}
                          index={idx}
                          key={el.id}
                        >
                          {(provided, snapshot) => (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              className={`w-1/2 rounded-lg ${
                                snapshot.isDragging ? 'bg-orange-100' : ''
                              }`}
                              style={{
                                ...provided.draggableProps.style,
                                top: snapshot.isDragging ? '4.3rem' : '3rem',
                                left: '7.2rem'
                              }}
                            >
                              <div
                                key={idx}
                                className="flex flex-col gap-y-1 text-center w-full text-xs md:text-base"
                              >
                                <figure className="relative h-32 object-cover mx-1">
                                  <div
                                    className={`absolute top-[-10px] left-24 badge badge-neutral ${
                                      snapshot.isDragging ? 'block' : 'hidden'
                                    }`}
                                  >
                                    {' '}
                                    · · ·
                                  </div>
                                  <img
                                    src={el.pictureUrlList[0]}
                                    className="w-full h-full rounded-lg"
                                  />
                                </figure>
                                <p className="truncate block font-semibold mr-1">
                                  {el.accommodationName}
                                </p>
                                <p className="flex justify-center gap-1 bg-gray-300">
                                  {addCommasToPrice(el.price)}원
                                  {el.price === minPrice && (
                                    <img
                                      src="https://em-content.zobj.net/thumbs/320/google/350/red-heart_2764-fe0f.png"
                                      alt="heart mark"
                                      className="w-4 md:h-5 md:pt-1"
                                    />
                                  )}
                                </p>
                                <div className="flex items-center justify-center gap-1 h-4 md:h-6 ">
                                  <RatingStars rate={el.rate} />
                                  {el.rate === highRate && (
                                    <img
                                      src="https://em-content.zobj.net/thumbs/320/google/350/red-heart_2764-fe0f.png"
                                      alt="heart mark"
                                      className="w-4 h-5 py-[2px]"
                                    />
                                  )}
                                </div>
                                <p className="bg-gray-300 truncate">
                                  {el.address}
                                </p>
                                <p>편의시설</p>
                                <Link
                                  to={`/accommodation/${el.id}?&checkindate=${checkInDate}&checkoutdate=${checkOutDate}&people=${people}&rate=${el.rate}`}
                                >
                                  <button className="btn mt-2 bg-red-500 hover:bg-red-600 text-white btn-sm mx-1 text-xs md:text-base font-normal">
                                    <span className="hidden sm:block">
                                      상세페이지{' '}
                                    </span>
                                    바로가기
                                  </button>
                                </Link>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
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
