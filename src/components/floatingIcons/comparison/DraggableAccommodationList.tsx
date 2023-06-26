import { useRecoilState } from 'recoil';
import { selectedAccommodation } from '../../../store/atom/comparisonAtom';
import { addCommasToPrice } from '../../../helpers';
import RatingStars from '../../common/RatingStars';
import { Link } from 'react-router-dom';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult
} from 'react-beautiful-dnd';

export const DraggableAccommodationList = () => {
  const [selectedAcc, setSelectedAcc] = useRecoilState(selectedAccommodation);

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
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="selectedAccommodations" direction="horizontal">
        {(provided) => (
          <ul
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex gap-1 text-center w-full justify-center text-xs md:text-base"
          >
            {selectedAcc.map((el, idx) => (
              <Draggable draggableId={el.id.toString()} index={idx} key={el.id}>
                {(provided, snapshot) => (
                  <>
                    {idx === 1 && selectedAcc.length === 3 && (
                      <div className="divider w-1 h-full m-0 bg-gray-300"></div>
                    )}
                    <li
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className={`w-44 rounded-lg list-none hover:bg-orange-100 ${
                        snapshot.isDragging ? 'bg-orange-100' : ''
                      }`}
                      style={{
                        ...provided.draggableProps.style,
                        top: snapshot.isDragging ? '4.3rem' : '3rem',
                        left:
                          idx === 0
                            ? selectedAcc.length === 3
                              ? '1.5rem'
                              : '7rem'
                            : idx === 1
                            ? selectedAcc.length === 3
                              ? '12.5rem'
                              : '18.2rem'
                            : '23.5rem'
                      }}
                    >
                      <div
                        key={idx}
                        className="flex flex-col gap-y-1 text-center w-full text-xs md:text-base"
                      >
                        <figure className="relative h-32 object-cover mx-1">
                          <div
                            className={`absolute top-[-10px] left-16 badge badge-warning ${
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
                        <p className="flex justify-center gap-1">
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
                        <p className="truncate">{el.address}</p>
                        <p>편의시설</p>
                        <Link
                          to={`/accommodation/${el.id}?&checkindate=${checkInDate}&checkoutdate=${checkOutDate}&people=${people}&rate=${el.rate}`}
                        >
                          <button className="btn mt-2 bg-red-500 hover:bg-red-600 text-white btn-sm mx-1 text-xs md:text-base font-normal">
                            <span className="hidden sm:block">상세페이지 </span>
                            바로가기
                          </button>
                        </Link>
                      </div>
                    </li>
                  </>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};
