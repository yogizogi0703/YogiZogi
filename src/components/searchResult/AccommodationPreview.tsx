import { FiMapPin } from 'react-icons/fi';
import RatingStars from '../common/RatingStars';
import { ISearchResultContent } from 'api/search';
import { BiShoppingBag } from 'react-icons/bi';
import { useRecoilState } from 'recoil';
import { selectedAccommodation } from '../../store/atom/comparisonAtom';

interface IAccommodationPreview {
  data: ISearchResultContent;
}

const formatPrice = (num: number) =>
  new Intl.NumberFormat('ko-KR', { maximumSignificantDigits: 3 }).format(num);

const AccommodationPreview = ({ data }: IAccommodationPreview) => {
  const { accommodationName, rate, pictureUrlList, address, price } = data;
  const [, setComparisonItems] = useRecoilState(
    selectedAccommodation
  );

  const addComparisonCart = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setComparisonItems((prev) => [...prev, data]);
  };

  return (
    <article className="card bg-base-100 shadow-xl mb-2">
      <figure
        className="h-60 bg-cover bg-center"
        style={{ backgroundImage: `url('${pictureUrlList[0]}')` }}
      ></figure>
      <div className="card-body grid gap-0 grid-cols-5 grid-rows-3 py-2 px-4 items-center">
        <div className="row-start-1 row-end-2 col-start-1 col-end-6">
          <p className="card-title block text-lg truncate">
      <div className="card-body grid gap-0 grid-cols-5 grid-rows-3 py-2 px-4 items-center">
        <div className="row-start-1 row-end-2 col-start-1 col-end-6">
          <p className="card-title block text-lg truncate">
            {accommodationName}
          </p>
        </div>
        <div className="flex items-center gap-2 row-start-2 row-end-3 col-start-1 col-end-6 text-lg font-bold text-right">
          <p>{`${formatPrice(price)}원`}</p>
          <button
            onClick={(e) => addComparisonCart(e)}
            className="btn btn-sm btn-circle btn-success"
          >
            <BiShoppingBag className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center gap-2 text-sm row-start-3 row-end-4 col-start-1 col-end-4">
          <FiMapPin className="text-emerald-400 text-2xl" />
          <p className="truncate">{address}</p>
        </div>
        <div className="row-start-3 row-end-4 col-start-4 col-end-6 flex items-center justify-end">
          <RatingStars rate={rate} />
        </div>
      </div>
    </article>
  );
};

export default AccommodationPreview;
