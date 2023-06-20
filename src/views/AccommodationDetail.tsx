import { addCommasToPrice } from '../helpers';
import RatingStars from '../components/common/RatingStars';
import { BiMap } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import { fetchData } from '../api';
import { AxiosResponse } from 'axios';
import {
  AccommodationDetailInitData,
  IAccommodationDetailResponse,
  IReview,
  IReviewResponse
} from '../api/accommodationDetail';
import { CarouselModal, IModalProps } from '../components/accommodationDetail/CarouselModal';
import { ConfirmModal } from '../components/accommodationDetail/ConfirmModal';

const AccommodationDetail = () => {
  const [accommodationData, setAccommodationData] =
    useState<IAccommodationDetailResponse>(AccommodationDetailInitData);
  const [page, setPage] = useState(1);
  const [reviewRes, setReviewRes] = useState<IReviewResponse>({
    content: [],
    totalElement: 0,
    totalPages: 0
  });
  const [reviewArr, setReviewArr] = useState<IReview[]>([]);
  const [modalProps, setModalProps] = useState<IModalProps>({
    imgList: [],
    alt: '',
    selectedImg: 0
  });
  const [totalPrices, setTotalPrices] = useState<number[]>([]);

  const rateAdj = [
    'Terrible',
    'Poor',
    'Bad',
    'Okay',
    'Good',
    'Fine',
    'Very good',
    'Excellent',
    'Outstanding',
    'Perfect'
  ];

  const accommodationId =
    window.location.hash.match(/\/accommodation\/(\d+)/) || '';
  const id = accommodationId[1];

  const urlParams = new URLSearchParams(
    '?' + window.location.hash.split('?')[1]
  );
  const {
    checkindate: checkInDate,
    checkoutdate: checkOutDate,
    people,
    rate: accommodationRate
  } = Object.fromEntries(urlParams.entries());

  const getReview = async (page: number) => {
    const reviewRes: AxiosResponse<any, any> | undefined = await fetchData.get(
      `/accommodation/${id}/review?page=${page}&pagesize=5`
    );
    if (reviewRes && reviewRes.data) {
      setReviewRes({
        content: reviewRes.data.content,
        totalElement: reviewRes.data.totalElements,
        totalPages: reviewRes.data.totalPages
      });
      setReviewArr((prev) => {
        const newReviewArr: IReview[] = [...prev];
        newReviewArr[page - 1] = reviewRes.data.content;
        return newReviewArr;
      });
    }
  };

  const getTotalPriceArr = () => {
    let totalPriceArr: number[] = []
    accommodationData.room.map((el) => {
      let totalPrice = 0;
      el.price.forEach((item) => {
        totalPrice += item.price;
      });
      totalPriceArr.push(totalPrice);
    });
    setTotalPrices(totalPriceArr)
  }; 
  
  useEffect(() => {
    (async () => {
      const result: AxiosResponse<any, any> | undefined = await fetchData.get(
        `/accommodation/${id}`
      );

      if (result) {
        setAccommodationData(result.data.data[1]);
      }
      getReview(1);
    })();
  }, [id]);

  useEffect(() => {
    getTotalPriceArr();
  }, [accommodationData]);

  useEffect(() => {
    (async () => {
      if (!reviewArr[page - 1]) getReview(page);
    })();
  }, [page]);

  return (
    <div className="flex flex-col gap-10 lg:pt-10 max-w-5xl mx-auto mb-20 p-5 lg:px-0">
      <div className="grid grid-rows-2 grid-cols-4 gap-2">
        {accommodationData.pictureUrlList.slice(0, 5).map((el, idx) => {
          if (idx === 0)
            return (
              <label
                key={idx}
                htmlFor="reservationModal"
                className="col-span-2 row-span-2 cursor-pointer"
                onClick={() =>
                  setModalProps({
                    imgList: accommodationData.pictureUrlList,
                    alt: 'accommodation total image',
                    selectedImg: idx
                  })
                }
              >
                <figure>
                  <img
                    src={el}
                    alt={`${accommodationData.accommodationName}-image-${idx}`}
                    className="w-full h-full object-cover"
                  />
                </figure>
              </label>
            );
          else {
            if (el.length > 0) {
              return (
                <label
                  key={idx}
                  htmlFor="reservationModal"
                  onClick={() =>
                    setModalProps({
                      imgList: accommodationData.pictureUrlList,
                      alt: 'accommodation total image',
                      selectedImg: idx
                    })
                  }
                >
                  <figure>
                    <img
                      src={el}
                      alt={`${accommodationData.accommodationName}-image-${idx}`}
                      className="w-full h-full object-cover cursor-pointer"
                    />
                  </figure>
                </label>
              );
            } else {
              return (
                <figure key={idx}>
                  <div className="flex items-center justify-center w-full h-full object-cover bg-gray-300">
                    No Image
                  </div>
                </figure>
              );
            }
          }
        })}
      </div>
      <section className="flex flex-col gap-5 md:gap-10">
        <div className="flex gap-5 flex-col md:flex-row">
          <div className="flex flex-col gap-5">
            <h1 className="text-2xl md:text-4xl font-bold">
              {accommodationData.accommodationName}
            </h1>
            <div className="flex items-center gap-5 text-xs sm:text-sm md:text-base">
              <span className="flex items-center gap-2">
                <BiMap />
                {accommodationData.address}
              </span>
              <div className="flex items-center gap-1">
                평점 :<RatingStars rate={Number(accommodationRate)} />
              </div>
            </div>
            <div className="text-xs sm:text-sm md:text-base">
              <h2 className="text-lg md:text-2xl font-semibold mb-2">
                숙소 정보
              </h2>
              <p className="leading-7">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim a
                praesentium explicabo totam officiis, placeat quis eaque
                doloribus vero, veniam eius quaerat rem, dolores et eum
                consectetur non quisquam nostrum!
                <br />
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia
                est repellendus impedit ab, et ducimus accusamus delectus atque
                dolorem hic maxime similique porro cumque mollitia quaerat
                fugiat? Ratione, quia illum?
              </p>
            </div>
          </div>
        </div>
        <div className="divider my-0" />
        <div>
          <h2 className="text-lg md:text-2xl font-semibold mb-4">
            객실안내 및 예약
          </h2>
          <div className="flex flex-col gap-5">
            {accommodationData.room.map((el, idx) => {
              return (
                <div key={idx} className="flex gap-3">
                  <label
                    key={idx}
                    htmlFor="reservationModal"
                    onClick={() =>
                      setModalProps({
                        imgList: el.pictureUrlList,
                        alt: 'accommodation detail image',
                        selectedImg: idx
                      })
                    }
                  >
                    <figure className="mx-auto">
                      <img
                        src={el.pictureUrlList[0]}
                        alt={`${accommodationData.accommodationName}-${el.roomName} image`}
                      />
                    </figure>
                  </label>
                  <div className="ml-2 w-1/3">
                    <h3 className="text-base md:text-xl font-semibold md:mb-1">
                      {el.roomName}
                    </h3>
                    <div className="flex flex-col gap-2">
                      <p>
                        <span className="font-semibold">체크인: </span>
                        {el.checkInTime}시
                      </p>
                      <p>
                        <span className="font-semibold">체크아웃</span>:{' '}
                        {el.checkOutTime}시
                      </p>
                      <p>
                        <span className="font-semibold">기본인원</span>:{' '}
                        {el.defaultPeople}명
                      </p>
                      <p>
                        <span className="font-semibold">최대인원</span>:{' '}
                        {el.maxPeople}명
                      </p>
                    </div>
                  </div>
                  <div className="divider divider-horizontal" />
                  <div className="flex flex-row w-1/3 justify-center">
                    <div className="flex flex-col gap-3 my-auto items-center">
                      <div className='font-semibold text-lg'>{addCommasToPrice(totalPrices[idx])}원</div>
                      <label
                        htmlFor="confirmModal"
                        className="flex gap-2 btn btn-sm text-xs md:btn-md md:text-base bg-red-500 hover:bg-red-600 text-white"
                      >
                        예약하기
                      </label>
                      <ConfirmModal
                        roomImg={el.pictureUrlList[0]}
                        roomInfo={accommodationData.room[idx]}
                        price={totalPrices[idx]}
                        checkInDate={checkInDate}
                        checkOutDate={checkOutDate}
                        people={people}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="divider" />
        <div>
          <h2 className="text-lg md:text-2xl font-semibold mb-4">리뷰</h2>
          <div className="flex items-center text-xl md:text-3xl text-center">
            <div className="my-5 w-1/3 p-2">
              <span className="font-semibold text-red-500">
                {accommodationRate}
              </span>{' '}
              / 10 점
            </div>
            <div className="divider divider-horizontal mx-1" />
            <div className="w-2/3 text-center">
              <p className="mb-3 font-semibold">
                {rateAdj[Math.trunc(Number(accommodationRate)) - 1]}
              </p>
              <p className="text-xs md:text-lg">
                총 8개의 확인된 리뷰가 있습니다.
              </p>
            </div>
          </div>
        </div>
        <div className="divider" />
        <div>
          {reviewArr &&
            reviewArr.length > 0 &&
            reviewArr[page - 1] &&
            Object.values(reviewArr[page - 1]).map((el, idx) => {
              return (
                <div
                  key={idx}
                  className="flex flex-col gap-3 p-3 border rounded-lg mb-5 text-xs md:text-base"
                >
                  <p className="font-semibold">{el.userId}</p>
                  <div className="flex flex-col sm:flex-row gap-4 text-xs md:text-base font-medium">
                    <div className="flex items-center gap-2 font-semibold">
                      평점 : <RatingStars rate={el.rating} />
                    </div>
                  </div>
                  <p> {el.description}</p>
                </div>
              );
            })}
          <div className="flex justify-center">
            {new Array(reviewRes.totalPages + 1).fill(0, 1, 5).map((_, idx) => {
              return (
                <div key={idx} className="join">
                  <input
                    aria-label={idx.toString()}
                    className="join-item btn btn-square btn-sm mr-1"
                    type="radio"
                    name="options"
                    checked={page === idx}
                    onChange={() => setPage(idx)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <CarouselModal
        imgList={modalProps.imgList}
        alt={modalProps.alt}
        selectedImg={modalProps.selectedImg}
      />
    </div>
  );
};

export default AccommodationDetail;
