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
    price: 80000,
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
    <div className="flex flex-col gap-10 pt-10 max-w-5xl mx-auto mb-20">
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
      <section className="flex flex-col gap-10">
        <div className='flex gap-5'>
          <div className='flex flex-col gap-5'>
            <h1 className="text-4xl font-bold">{data.name}</h1>
            <div className="flex items-center gap-5">
              <span className="flex items-center gap-2 ">
                <BiMap />
                {data.address}
              </span>
              <div className="flex items-center gap-1">
                평점 :<RatingStars rate={data.rate} />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">숙소 정보</h2>
              <p className="leading-7 text-lg">
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
          <article className='flex flex-col gap-2 w-md'>
            <figure className='w-full'>
              <img src="http://via.placeholder.com/400x400" />
            </figure>
            <p className='flex items-center'><BiMap />{data.address}</p>
            <p className='font-semibold'>교통편: <span className='font-normal'>용산역 5분 거리로 바로 앞 4호선 신용산역 전철역이 가까워 이동 편리</span></p>
          </article>
        </div>

        <div className="divider" />
        <div>
          <h2 className="text-2xl font-semibold mb-4">객실안내 및 예약</h2>
          <div className="flex">
            <figure className="w-1/3">
              <img src={data.accomodationImage} />
            </figure>
            <div className="divider divider-horizontal" />
            <div className="flex flex-col gap-3 w-1/3">
              <h3 className="text-xl font-semibold mb-1">Rood Name</h3>
              <p className="text-lg mb-1">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Perspiciatis unde vel a exercitationem vero veniam, ad veritatis
                beatae sunt delectus nobis sequi temporibus deleniti alias fugit
                maxime autem esse vitae?
              </p>
              <div className="flex gap-1">
                <span className="badge badge-outline badge-lg">최소인원 1</span>
                <span className="badge badge-outline badge-lg">최대인원 2</span>
              </div>
            </div>
            <div className="divider divider-horizontal" />
            <div className="w-1/6 my-auto text-center">
              <p className="text-xl font-semibold mb-5">{data.price}원</p>
              <button className="btn btn-secondary text-white">결제하기</button>
            </div>
          </div>
        </div>
        <div className="divider" />
        <div>
          <h2 className="text-2xl font-semibold mb-4">리뷰</h2>
          <div className="flex items-center ">
            <div className="my-5 w-1/3 text-3xl text-center p-2">
              <span className="font-semibold text-red-500">{data.rate}점</span>{' '}
              / 10 점
            </div>
            <div className="divider divider-horizontal" />
            <div className="w-2/3 text-center">
              <p className="text-3xl font-semibold mb-3">
                {rateAdj[Math.trunc(data.rate) - 1]}
              </p>
              <p className="text-lg">총 8개의 확인된 리뷰가 있습니다.</p>
            </div>
          </div>
        </div>
        <div className="divider" />
        <div>
          <div className="flex flex-col gap-3 p-3 border rounded-lg">
            <p className="text-lg font-semibold">name</p>
            <div className="flex gap-4 text-lg font-medium">
              <p className="font-semibold">
                투숙 기간 :{' '}
                <span className="text-slate-500 font-medium">1/1 ~ 2/1</span>
              </p>
              <p className="font-semibold">
                평점 : <span className="text-slate-500"></span>
              </p>
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
