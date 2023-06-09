import AccommodationPreview from '../components/searchResult/AccommodationPreview';

const data = {
  categoryId: 1,
  accomodationId: 2,
  name: '그랜드 인터컨티넨탈 서울 파르나스',
  rate: 4.5,
  accommodationImage: 'http://via.placeholder.com/640x480',
  address: '대한민국 서울특별시 강남구 테헤란로 521',
  price: 120000,
  lat: 37.508535,
  lon: 127.047883
};

const SearchResult = () => {
  return (
    <div>
      <section>
        <section>
          <button>호텔</button>
          <button>모텔</button>
          <button>펜션</button>
        </section>
        {/* divider */}
        <section>
          <label>
            <div>평점순</div>
            <input type="radio" name="sortBy" id="rate" />
          </label>
          <label>
            <div>높은 가격순</div>
            <input type="radio" name="sortBy" id="highPrice" />
          </label>
          <label>
            <div>낮은 가격순</div>
            <input type="radio" name="sortBy" id="lowPrice" />
          </label>
          <label>
            <div>거리순</div>
            <input type="radio" name="sortBy" id="distance" />
          </label>
        </section>
        <section>
          <div>
            <p>가격 범위</p>
            <p>1만원 ~ 30만원</p>
            <button>적용</button>
          </div>
          <input type="range" />
          <div>
            <p>1만원</p>
            <p>30만원</p>
          </div>
        </section>
      </section>
      <section>
        <div>
          <h3>42개의 검색 결과</h3>
          <button>지도로 보기</button>
        </div>
        <hr />
        <div>
          <AccommodationPreview data={data} />
          <AccommodationPreview data={data} />
          <AccommodationPreview data={data} />
        </div>
      </section>
    </div>
  );
};
export default SearchResult;
