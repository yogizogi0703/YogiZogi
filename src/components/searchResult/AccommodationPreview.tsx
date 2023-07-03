import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { FiMapPin } from 'react-icons/fi';
import RatingStars from '../common/RatingStars';
import { ISearchResultContent } from 'api/search';
import { selectedAccommodation } from '../../store/atom/comparisonAtom';
import { AlertModal } from '../../components/common/AlertModal';
import { addCommasToPrice } from '../../helpers';
import { IComparisonBoxProps } from 'components/floatingIcons/comparison/Comparison';

interface IAccommodationPreview {
  data: ISearchResultContent;
}

const AccommodationPreview = ({ data }: IAccommodationPreview) => {
  const { accommodationName, rate, picUrl, address, price } = data;
  const [comparisonItems, setComparisonItems] = useRecoilState<IComparisonBoxProps[]>(
    selectedAccommodation
  );
  const [alertModalState, setAlertModalState] = useState(false);

  const addComparisonCart = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (
      comparisonItems.some(
        (el) => el.accommodationName === data.accommodationName
      )
    )
      setAlertModalState(true);
    else {
      const comparisonData = {
        accommodationName: data.accommodationName,
        accommodationId: data.id.toString(),
        roomId: 0,
        price: data.price,
        imgUrl: data.picUrl,
      };
      setComparisonItems((prev) => [...prev, comparisonData]);
    }
  };

  return (
    <article className="card bg-base-100 shadow-xl mb-2">
      <figure
        className="h-60 bg-cover bg-center"
        style={{ backgroundImage: `url('${picUrl}')` }}
      ></figure>
      <div className="card-body grid gap-0 grid-cols-5 grid-rows-3 py-2 px-4 items-center">
        <div className="row-start-1 row-end-2 col-start-1 col-end-6">
          <p className="card-title block text-lg truncate"></p>
        </div>
      </div>
      <div className="card-body grid gap-0 grid-cols-5 grid-rows-3 py-2 px-4 items-center">
        <div className="row-start-1 row-end-2 col-start-1 col-end-6">
          <p className="card-title block text-lg truncate">
            {accommodationName}
          </p>
        </div>
        <div className="flex items-center gap-2 row-start-2 row-end-3 col-start-1 col-end-6 text-lg font-bold">
          <p>{`${addCommasToPrice(price)}원`}</p>
          <button
            onClick={(e) => addComparisonCart(e)}
            className="btn btn-sm border-red-500 bg-white"
          >
            비교함에 담기
          </button>
        </div>
        <div className="flex items-center gap-2 text-sm row-start-3 row-end-4 col-start-1 col-end-4">
          <FiMapPin className="text-red-500 text-2xl shrink-0" />
          <p className="truncate">{address}</p>
        </div>
        <div className="row-start-3 row-end-4 col-start-4 col-end-6 flex items-center justify-end">
          <RatingStars rate={rate} />
        </div>
      </div>
      <AlertModal
        content="이미 담긴 상품입니다."
        modalState={alertModalState}
        handleModal={setAlertModalState}
      />
    </article>
  );
};

export default AccommodationPreview;
