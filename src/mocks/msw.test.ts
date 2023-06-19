import axios from 'axios';
import { describe, expectTypeOf, it } from 'vitest';

describe('MSW Fetch Test: ', () => {
  it('login', async () => {
    const result = {
      token: {
        'X-AUTH-TOKEN':
          'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJOaWJvSGlhSWZQNzk3eFI3OE9hdFVnPT0iLCJqdGkiOiI0UnR5UnJrejMvcnNMeEt0MmJTT2p3PT0iLCJyb2xlcyI6IlVTRVIiLCJpYXQiOjE2ODYyMjQ5MTgsImV4cCI6MTY4NjMxMTMxOH0.iTUxHD8GTdSb9SQWkOnD6CLzhtLBfTOZXxfKyTxJXJ8',
        email: 'test@test',
        nickname: 'nickname'
      }
    };
    const {
      data: { data }
    } = await axios({
      method: 'post',
      url: '/api/user/login',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        email: 'test@test',
        password: '12345678'
      }
    });

    expectTypeOf(data.token).toBeObject();
    expect(data.token['X-AUTH-TOKEN']).toBe(result.token['X-AUTH-TOKEN']);
    expect(data.token.email).toBe(result.token.email);
    expect(data.token.nickname).toBe(result.token.nickname);
  });

  it('kakao login', async () => {
    const result = {
      token: {
        'X-AUTH-TOKEN':
          'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJOaWJvSGlhSWZQNzk3eFI3OE9hdFVnPT0iLCJqdGkiOiI0UnR5UnJrejMvcnNMeEt0MmJTT2p3PT0iLCJyb2xlcyI6IlVTRVIiLCJpYXQiOjE2ODYyMjQ5MTgsImV4cCI6MTY4NjMxMTMxOH0.iTUxHD8GTdSb9SQWkOnD6CLzhtLBfTOZXxfKyTxJXJ8',
        email: 'test@test',
        nickname: 'nickname'
      }
    };
    const {
      data: { data }
    } = await axios({
      method: 'post',
      url: '/api/user/kakao-login',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        email: 'test@test',
        password: '12345678'
      }
    });

    expectTypeOf(data.token).toBeObject();
    expect(data.token['X-AUTH-TOKEN']).toBe(result.token['X-AUTH-TOKEN']);
    expect(data.token.email).toBe(result.token.email);
    expect(data.token.nickname).toBe(result.token.nickname);
  });

  it('registered list', async () => {
    const result = [
      {
        id: 5,
        userId: 3,
        accommodationName: 'ABC 호텔',
        startDate: '2023-06-01',
        endDate: '2023-06-02',
        price: 100000,
        reviewRegistered: false
      },
      {
        id: 3,
        userId: 3,
        accommodationName: 'BAC 모텔',
        startDate: '2023-06-03',
        endDate: '2023-06-04',
        price: 40000,
        reviewRegistered: true
      }
    ];

    const {
      data: { content }
    } = await axios('/api/user/1/mybook');

    expectTypeOf(content).toBeArray();
    for (let i = 0; i < result.length; i++) {
      expect(content[i].id).toBe(result[i].id);
      expect(content[i].userId).toBe(result[i].userId);
      expect(content[i].accommodationName).toBe(result[i].accommodationName);
      expect(content[i].startDate).toBe(result[i].startDate);
      expect(content[i].endDate).toBe(result[i].endDate);
      expect(content[i].price).toBe(result[i].price);
      expect(content[i].reviewRegistered).toBe(result[i].reviewRegistered);
    }
  });

  it('accommodation detail', async () => {
    const result = {
      id: 1,
      accommodationName: 'BAC 호텔',
      category: 1,
      rate: 6.7,
      price: 230000,
      address: '서울 중구 쌍림동 155-1',
      location: '강남구 역삼동',
      lat: 37.50252991,
      lon: 127.0382753,
      info: '<article class="detail_info"> <!-- 기본 정보 --> <h3 class="category" id="default_info_tab" type="h3"><span>기본 정보</span></h3> <section class="default_info"> <!-- 사장님 한마디 & 추천이유 --> <div class="comment_mobile"> <h3>사장님 한마디</h3>                     겨울 눈 꽃이 아름다운 산과 청정지역에서만 볼 수 있는 반딧불, 고라니도 가끔 볼수 있고 타인에 침해 받지 않고 편안한 휴식을 보낼 수 있습니다                </div> <h3>주변정보</h3> <ul> <li>두물머리 부근</li></ul> <h3>공지 사항</h3> <ul> <li><b>보증금 제도가 있습니다 (퇴실 시 반환)</b></li><li><b>전 객실 및 바비큐장 포함 금연 (적발 시 퇴실 조치, 환불 불가)</b></li><li><b>객실 및 바비큐장 내 전기그릴, 프라이팬 고기구이 또는 객실 및 바비큐장 내 부탄가스 이용 경우 퇴실 조치 (환불 불가)</b></li><li><b>예약자의 방문 손님은 방문 1시간 이상 시 추가인원으로 간주</b></li><li>준성수기 : 7월 1일~7월 14일 / 8월 22일~9월 3일 </li><li>성수기 : 7월 15일~8월 21일</li></ul> <h3>기본 정보</h3> <ul> <li>입실 : 15:00 | 퇴실 : 11:00</li><li>22시 이후 입실 시 사전문의 (필수)</li><li>무료 Wi-Fi</li><li>전 객실 금연</li><li>주차 가능</li><li>마트 픽업 (농민마트 / 물품 구매 시 / 펜션문의)</li></ul> <h3>객실 정보</h3> <ul> <li>객실 내 블루투스 스피커 구비</li><li>스파 이용시 : A동 30,000원, B동 10,000원, C동 20,000원 (현장결제) / 이용시간 입실~22:00 까지</li><li>객실 내 노래방 가능 (A동, C동만 가능) : ~22:00 / 시간당 10,000원 / 시간엄수 필수</li><li>A동 : 32도 추가 시 온수비 70,000원 / 스파 이용시 30,000원 (현장결제)</li><li>실내수영장 (A동 풀빌라) : 이용시간 15:00~22:00 까지 / 수영복 미착용시 수영장 사용 불가 / 퇴실 당일 온수유지 안됨 / 하절기 (5월3일~10월초) 미온수 31도 요청 시 70,000원 / 동절기 미온수 32도 요청 시 70,000원 (사용 1일전 까지 사전신청 및 현장결제) / 11월~3월까지 온수 미사용 시 수영장 물은 채워져있지 않음</li></ul> <h3>인원 추가 정보</h3> <ul> <li>A동 : 1인 20,000원 (12개월 미만), 40,000원 (12개월 이상)</li><li>B동, C동 : 1인 20,000원 (영유아 포함)</li><li>영유아 인원수 포함 / 최대인원 초과불가</li><li><b>현장 결제</b></li></ul> <h3>펜션 서비스</h3> <ul> <li><b>시설 이용문의 및 비용 별도 펜션문의</b></li><li>야외 수영장 (하절기 운영) : 15:00~20:00 / 크기 4m x 8m / 수영장 운영은 날씨 또는 펜션 상황에 따라 변동될 수 있음</li><li>세미나실 : 유료</li><li>수상레저 40% 할인권 제공</li><li>출장 야외 뷔페 이용가능 (칠순잔치, 돌잔치, 작은모임, 소규모 행사 가능 / 펜션문의)</li><li>탁구대</li></ul> <h3>바비큐 시설</h3> <ul> <li>숯+그릴 : 테이블당 20,000원</li><li>숯불 요청시간 : ~20:00</li><li>실내 바비큐 (겨울 : 바닥 보일러실 설치됨 (추위 걱정 없음) / 여름 : 모기,벌레 걱정없음)</li><li>11월~2월까지 바베큐 이용시간 : 입실~21:00 까지</li><li>3월~10월까지 바베큐 이용시간 : 입실~22:00 까지</li><li>현장결제</li></ul> <h3>취소 및 환불 규정</h3> <ul> <li>숙박일 기준 10일전 : 100% 환불</li><li>숙박일 기준 9일전 : 90% 환불</li><li>숙박일 기준 8일전 : 80% 환불</li><li>숙박일 기준 7일전 : 70% 환불</li><li>숙박일 기준 6일전 : 60% 환불</li><li>숙박일 기준 5일전 : 50% 환불</li><li>숙박일 기준 4일전 : 40% 환불</li><li>숙박일 기준 3일전 : 30% 환불</li><li>숙박일 기준 2일전 : 20% 환불</li><li>숙박일 기준 1일전~당일 및 No-show : 환불불가</li><li>취소, 환불 시 수수료가 발생할 수 있습니다</li></ul> <h3>확인사항 및 기타</h3> <ul> <li>최대 인원 초과시 입실이 불가 합니다 (방문객 불가)</li><li>객실 내 육류, 튀김류, 생선류 조리를 할 수 없습니다</li><li>전 객실 애완동물 출입이 불가합니다</li><li>보호자 동반없는 미성년자는 이용하실 수 없습니다</li><li>해당 이미지는 실제와 상이 할 수 있습니다</li><li>이용시설의 분실 및 훼손의 책임은 이용자에게 있으니 주의부탁드립니다</li><li>객실 내에서는 화재위험물질 (화약, 폭죽 등)은 사용 하실 수 없습니다 (화재로 인한 책임은 이용자에게 있습니다)</li><li>쓰레기는 지정된 장소에 분리하여 주시기 바랍니다</li><li>위의 정보는 펜션의 사정에 따라 변경될 수 있습니다</li><li>성수기 기간동안 일부 객실의 경우 요금변동이 있을 수 있습니다</li><li>수영장 운영은 날씨 또는 펜션 상황에 따라 변동 될 수 있습니다</li></ul> <div class="map" id="google_maps"></div> </section> <!-- 편의시설 및 서비스 --> <h3 class="category" type="h3"><span>편의시설 및 서비스</span></h3> <section class="service"> <ul class="theme_wrap"> <li class="theme_56">수영장</li><li class="theme_60">와이파이</li><li class="theme_62">픽업가능</li><li class="theme_143">전기밥솥</li><li class="theme_147">무료주차</li><li class="theme_148">BBQ</li><li class="theme_221">주차장</li><li class="theme_222">취사가능</li><li class="theme_223">TV</li><li class="theme_224">욕실용품</li><li class="theme_227">에어컨</li><li class="theme_229">객실샤워실</li><li class="theme_231">드라이기</li><li class="theme_235">금연</li><li class="theme_237">객실내취사</li><li class="theme_327">전자레인지</li><li class="theme_329">객실스파</li> </ul> </section> <!-- 판매자 정보 --> <h3 class="category" type="h3"><span>판매자 정보</span></h3> <section class="seller_info"> <h3>상호</h3> <ul> <li>팬션ABC풀하우스</li> </ul> <h3>대표자명</h3> <ul> <li>정재훈</li> </ul> <h3>주소</h3> <ul> <li>경기 양평군 서종면 황순원로 532-14</li> </ul> <h3>전화번호</h3> <ul> <li>050440139926</li> </ul> <h3>이메일</h3> <ul> <li>[yss235@naver.com](mailto:yss235@naver.com)</li> </ul> <h3>사업자번호</h3> <ul> <li>797-14-00154</li> </ul> </section> </article>',
      pictureUrlList: [
        'https://image.goodchoice.kr/resize_490x348/affiliate/2020/03/24/5e799ea5046b1.jpg',
        'https://image.goodchoice.kr/resize_490x348/affiliate/2019/05/24/5ce77945bfc5a.jpg',
        'https://image.goodchoice.kr/resize_490x348/affiliate/2019/05/24/5ce77944c700f.jpg',
        'https://image.goodchoice.kr/resize_490x348/affiliate/2019/05/24/5ce77949275cc.jpg',
        'https://image.goodchoice.kr/resize_490x348/affiliate/2018/03/07/5a9f825b6786b.jpg',
        'https://image.goodchoice.kr/resize_490x348/affiliate/2018/03/07/5a9f826181a17.jpg',
        'https://image.goodchoice.kr/resize_490x348/affiliate/2018/03/07/5a9f8257f0291.jpg',
        'https://image.goodchoice.kr/resize_490x348/affiliate/2018/03/07/5a9f82627a513.jpg',
        'https://image.goodchoice.kr/resize_490x348/affiliate/2019/05/24/5ce779fa182ac.jpg',
        'https://image.goodchoice.kr/resize_490x348/affiliate/2019/05/24/5ce779f48b2c5.jpg',
        'https://image.goodchoice.kr/resize_490x348/affiliate/2019/05/24/5ce77a9cc2677.jpg',
        'https://image.goodchoice.kr/resize_490x348/affiliate/2019/05/24/5ce77a99e703a.jpg',
        'https://image.goodchoice.kr/resize_490x348/affiliate/2019/05/24/5ce77a99651b5.jpg',
        'https://image.goodchoice.kr/resize_490x348/affiliate/2019/05/24/5ce77a9a6e2e1.jpg',
        'https://image.goodchoice.kr/resize_490x348/affiliate/2019/05/24/5ce77b6b2c97c.jpg',
        'https://image.goodchoice.kr/resize_490x348/affiliate/2019/05/24/5ce77b6c33f67.jpg',
        'https://image.goodchoice.kr/resize_490x348/affiliate/2021/10/12/616540871d99d.jpg',
        'https://image.goodchoice.kr/resize_490x348/affiliate/2019/07/12/5d2807d109fe3.jpg',
        'https://image.goodchoice.kr/resize_490x348/affiliate/2019/06/11/5cff2f902e336.jpg',
        'https://image.goodchoice.kr/resize_490x348/affiliate/2019/06/11/5cff2f64caf06.jpg',
        'https://image.goodchoice.kr/resize_490x348/affiliate/2020/03/24/5e799ea5046b1.jpg',
        'https://image.goodchoice.kr/resize_490x348/affiliate/2019/05/24/5ce77945bfc5a.jpg',
        'https://image.goodchoice.kr/resize_490x348/affiliate/2019/05/24/5ce77944c700f.jpg',
        'https://image.goodchoice.kr/resize_490x348/affiliate/2019/05/24/5ce77949275cc.jpg',
        'https://image.goodchoice.kr/resize_490x348/affiliate/2018/03/07/5a9f825b6786b.jpg',
        'https://image.goodchoice.kr/resize_490x348/affiliate/2018/03/07/5a9f826181a17.jpg',
        'https://image.goodchoice.kr/resize_490x348/affiliate/2018/03/07/5a9f8257f0291.jpg',
        'https://image.goodchoice.kr/resize_490x348/affiliate/2018/03/07/5a9f82627a513.jpg',
        'https://image.goodchoice.kr/resize_490x348/affiliate/2019/05/24/5ce779fa182ac.jpg',
        'https://image.goodchoice.kr/resize_490x348/affiliate/2019/05/24/5ce779f48b2c5.jpg',
        'https://image.goodchoice.kr/resize_490x348/affiliate/2019/05/24/5ce77a9cc2677.jpg'
      ],
      room: [
        {
          id: 1,
          roomName: 'Standard Double',
          checkInTime: 15,
          checkOutTime: 13,
          defaultPeople: 2,
          maxPeople: 4,
          pictureUrlList: [
            '//image.goodchoice.kr/resize_370x220/adimg_new/49914/329560/874943ee5c604e46a4f529d8ecc1558d.jpg'
          ],
          price: [
            {
              id: 1,
              date: '2023-05-25',
              price: 58000,
              roomCnt: 3
            },
            {
              id: 2,
              date: '2023-05-26',
              price: 78000,
              roomCnt: 5
            }
          ]
        },
        {
          id: 2,
          name: 'Deluxe',
          checkInTime: 15,
          checkOutTime: 13,
          defaultPeople: 2,
          maxPeople: 4,
          pictureUrlList: [
            '//image.goodchoice.kr/resize_370x220/adimg_new/49914/329560/874943ee5c604e46a4f529d8ecc1558d.jpg'
          ],
          price: [
            {
              id: 3,
              date: '2023-05-25',
              price: 68000,
              roomCnt: 3
            },
            {
              id: 4,
              date: '2023-05-26',
              price: 68000,
              roomCnt: 2
            }
          ]
        }
      ]
    };

    const {
      data: { data }
    } = await axios('/api/accommodation/1');

    expectTypeOf(data).toBeArray();
    expectTypeOf(data[1]).toBeObject();

    it('review list', async () => {
      const result = [
        {
          id: 20,
          userId: 16,
          accommodationId: 1,
          rating: 10,
          description: '별점 준 이유'
        },
        {
          id: 19,
          userId: 17,
          sellerId: null,
          accommodationId: 1,
          rating: 8,
          description: '별점 준 이유'
        },
        {
          id: 18,
          userId: 18,
          sellerId: null,
          accommodationId: 1,
          rating: 7,
          description: '별점 준 이유'
        }
      ];

      const {
        data: { content }
      } = await axios('/api/accommodation/1/review?page=1&pagesize=3');

      expectTypeOf(content).toBeArray();
      for (let i = 0; i < result.length; i++) {
        expectTypeOf(content[i]).toBeObject();
        expect(content[i]).toEqual(result[i]);
      }
    });
  });
});
