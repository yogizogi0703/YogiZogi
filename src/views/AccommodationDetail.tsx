import { addCommasToPrice } from '../helpers';
import RatingStars from '../components/searchResult/RatingStars';
import { BiMap } from 'react-icons/bi';

const AccommodationDetail = () => {
  const data = {
    categoryId: 1,
    accomodationId: 1,
    name: '롯데호텔 서울',
    rate: 9,
    accomodationImage: 'http://via.placeholder.com/640x480',
    address: '서울특별시 중구 을지로 30',
    price: 99999999,
    lat: 37.565773,
    lon: 126.981414
  };
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
  return (
    <div className="flex flex-col gap-10 lg:pt-10 max-w-5xl mx-auto mb-20 p-5 lg:px-0">
      <div className="grid grid-rows-2 grid-cols-4 gap-2">
        <figure className="col-span-2 row-span-2">
          <img src="http://via.placeholder.com/640x480" />
        </figure>
        <figure>
          <img src="http://via.placeholder.com/640x480" />
        </figure>
        <figure>
          <img src="http://via.placeholder.com/640x480" />
        </figure>
        <figure>
          <img src="http://via.placeholder.com/640x480" />
        </figure>
        <figure>
          <img src="http://via.placeholder.com/640x480" />
        </figure>
      </div>
      <section className="flex flex-col gap-5 md:gap-10">
        <div className="flex gap-5 flex-col md:flex-row">
          <div className="flex flex-col gap-5">
            <h1 className="text-2xl md:text-4xl font-bold">{data.name}</h1>
            <div className="flex items-center gap-5 text-xs sm:text-sm md:text-base">
              <span className="flex items-center gap-2">
                <BiMap />
                {data.address}
              </span>
              <div className="flex items-center gap-1">
                평점 :<RatingStars rate={data.rate} />
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
          <article className="flex md:flex-col gap-2 sm:gap-5 w-md text-xs sm:text-sm md:text-base">
            <figure className="w-32 md:w-64">
              <img src="http://via.placeholder.com/256x256" />
            </figure>
            <div className="flex flex-col gap-3 justify-center">
              <p>
                <BiMap className="inline-flex items-center h-5 w-5 pb-1" />
                {data.address}
              </p>
              <p className="font-semibold">
                교통편: <br className="md:hidden" />
                <span className="font-normal">
                  용산역 5분 거리로 바로 앞 4호선 신용산역 전철역이 가까워 이동
                  편리
                </span>
              </p>
            </div>
          </article>
        </div>
        <div className="divider my-0" />
        <div>
          <h2 className="text-lg md:text-2xl font-semibold mb-4">
            객실안내 및 예약
          </h2>
          <div className="flex flex-col md:flex-row gap-3">
            <figure className="mx-auto w-2/3 md:w-1/3">
              <img src={data.accomodationImage} />
            </figure>
            <div className="flex flex-row md:w-2/3">
              <div className="flex flex-col gap-3 w-3/4 md:w-3/4">
                <h3 className="text-base md:text-xl font-semibold md:mb-1">
                  Room Name
                </h3>
                <p className="text-xs md:text-base mb-1">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Perspiciatis unde vel a exercitationem vero veniam, ad
                  veritatis beatae sunt delectus nobis sequi temporibus deleniti
                  alias fugit maxime autem esse vitae?
                </p>
                <div className="flex gap-1">
                  <span className="badge badge-outline badge-sm md:badge-md">
                    최소인원 1
                  </span>
                  <span className="badge badge-outline badge-sm md:badge-md">
                    최대인원 2
                  </span>
                </div>
              </div>
              <div className="divider divider-horizontal mx-2" />
              <div className="flex flex-col gap-3 w-1/4 md:w-1/4 my-auto items-center justify-end">
                <p className="w-fit text-xs sm:text-base lg:text-xl font-semibold md:mb-5 ">
                  {addCommasToPrice(data.price)}원
                </p>
                <button className="btn btn-secondary btn-xs md:btn-md text-white">
                  예약하기
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="divider" />
        <div>
          <h2 className="text-lg md:text-2xl font-semibold mb-4">리뷰</h2>
          <div className="flex items-center text-xl md:text-3xl text-center">
            <div className="my-5 w-1/3 p-2">
              <span className="font-semibold text-red-500">{data.rate}</span>{' '}
              / 10 점
            </div>
            <div className="divider divider-horizontal mx-1" />
            <div className="w-2/3 text-center">
              <p className="mb-3 font-semibold">
                {rateAdj[Math.trunc(data.rate) - 1]}
              </p>
              <p className="text-xs md:text-lg">총 8개의 확인된 리뷰가 있습니다.</p>
            </div>
          </div>
        </div>
        <div className="divider" />
        <div>
          <div className="flex flex-col gap-3 p-3 border rounded-lg text-xs md:text-base">
            <p className="font-semibold">name</p>
            <div className="flex flex-col sm:flex-row gap-4 text-xs md:text-base font-medium">
              <p className="font-semibold">
                투숙 기간 :{' '}
                <span className="text-slate-500 font-medium">1/1 ~ 2/1</span>
              </p>
              <div className="flex items-center gap-2 font-semibold">
                평점 : <div className="text-slate-500"><RatingStars rate={9} /></div>
              </div>
            </div>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione
              molestiae, maiores perferendis non possimus, dolorum repellendus
              quam consequatur maxime obcaecati distinctio magni ab qui nam, id
              rem eligendi deserunt nemo?
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AccommodationDetail;
