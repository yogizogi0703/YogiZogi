import { useRecoilValue } from 'recoil';
import { selectedAccommodation } from '../../store/atom/comparisonAtom';
import { addCommasToPrice } from '../../helpers';

export const ComparisonBox = ({ display }: {display: boolean}) => {
  const selectedAcc = useRecoilValue(selectedAccommodation);
  const urlParams = new URLSearchParams(
    '?' + window.location.hash.split('?')[1]
    );
    const {
      checkindate: checkInDate,
      checkoutdate: checkOutDate,
      people: people
  } = Object.fromEntries(urlParams.entries());

  const convertDateFormat = (date: string) => {
    const [, month, day] = date.split('-');
    return `${month}/${day}`;
  };
  
  return (
    <article
      className={`flex flex-col justify-between gap-2 py-2 px-2 absolute w-60 h-52 bottom-0 right-16 rounded-xl bg-[#3abff8] ${
        display ? 'block' : 'hidden'
      }`}
    >
      {selectedAcc.map((el, idx) => {
        return (
          <div
            key={idx}
            className="flex gap-1 rounded-lg bg-white"
          >
            <figure
              className="w-1/2 rounded-s-lg cursor-pointer tooltip tooltip-warning tooltip-right"
              data-tip="자세히보기"
            >
              <img
                src={el.pictureUrlList[0]}
                alt={`${el.accommodationName} image`}
                className="rounded-s-lg h-full"
              />
            </figure>
            <div className="w-1/2">
              <p className="truncate font-semibold">{el.accommodationName}</p>
              <p>
                {convertDateFormat(checkInDate)} ~{' '}
                {convertDateFormat(checkOutDate)}
              </p>
              <p>{addCommasToPrice(el.price)}원</p>
            </div>
          </div>
        );
      })}
      <div className='flex justify-end mb-1 w-full h-full items-end'>
        <button className="btn btn-sm bg-white">비교하기</button>
      </div>
    </article>
  );
};
