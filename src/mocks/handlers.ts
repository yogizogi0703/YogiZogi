import { rest } from 'msw';
import { mockData as accommodationData } from './api/data/accommodationData';
import { mockData as reviewData } from './api/data/reviewData';

let reviewIdCount = 100;

export const handlers = [
  // 회원가입
  rest.post('/api/user/sign-up', (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        code: 'RESPONSE_SUCCESS',
        status: 'OK',
        msg: 'SUCCESS',
        data: {
          msg: '회원 가입에 성공했습니다.'
        }
      })
    );
  }),

  // 로그인
  rest.post('/api/user/login', async (req, res, ctx) => {
    const { email } = await req.json();

    return res(
      ctx.status(200),
      ctx.json({
        code: 'RESPONSE_SUCCESS',
        status: 'OK',
        msg: 'SUCCESS',
        data: {
          token: {
            'X-AUTH-TOKEN':
              'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJOaWJvSGlhSWZQNzk3eFI3OE9hdFVnPT0iLCJqdGkiOiI0UnR5UnJrejMvcnNMeEt0MmJTT2p3PT0iLCJyb2xlcyI6IlVTRVIiLCJpYXQiOjE2ODYyMjQ5MTgsImV4cCI6MTY4NjMxMTMxOH0.iTUxHD8GTdSb9SQWkOnD6CLzhtLBfTOZXxfKyTxJXJ8',
            email,
            nickname: 'nickname'
          }
        }
      })
    );
  }),

  // 카카오 로그인
  rest.post('/api/user/kakao-login', async (req, res, ctx) => {
    const { email } = await req.json();

    return res(
      ctx.status(200),
      ctx.json({
        code: 'RESPONSE_SUCCESS',
        status: 'OK',
        msg: 'SUCCESS',
        data: {
          token: {
            'X-AUTH-TOKEN':
              'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJOaWJvSGlhSWZQNzk3eFI3OE9hdFVnPT0iLCJqdGkiOiI0UnR5UnJrejMvcnNMeEt0MmJTT2p3PT0iLCJyb2xlcyI6IlVTRVIiLCJpYXQiOjE2ODYyMjQ5MTgsImV4cCI6MTY4NjMxMTMxOH0.iTUxHD8GTdSb9SQWkOnD6CLzhtLBfTOZXxfKyTxJXJ8',
            email,
            nickname: 'nickname'
          }
        }
      })
    );
  }),

  // 로그아웃
  rest.get('/api/user/logout', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: 'RESPONSE_SUCCESS',
        status: 'OK',
        msg: 'SUCCESS',
        data: null
      })
    );
  }),

  // 예약 목록 확인
  rest.get('/api/user/:userId/mybook', (req, res, ctx) => {
    const page = parseInt(req.url.searchParams.get('page') || '0');
    const pageSize = parseInt(req.url.searchParams.get('pageSize') || '0');

    return res(
      ctx.status(200),
      ctx.json({
        code: 'RESPONSE_SUCCESS',
        status: 'OK',
        msg: 'SUCCESS',
        data: {
          msg: '성공적으로 작업을 수행 했습니다.'
        },
        content: [
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
        ],
        pageable: {
          sort: {
            empty: false,
            sorted: true,
            unsorted: false
          },
          offset: 0,
          pageNumber: page,
          pageSize,
          paged: true,
          unpaged: false
        },
        totalElements: reviewData.length,
        totalPages: Math.ceil(reviewData.length / pageSize),
        last: true,
        size: pageSize,
        number: 0,
        sort: {
          empty: false,
          sorted: true,
          unsorted: false
        },
        numberOfElements: 2,
        first: true,
        empty: false
      })
    );
  }),

  // 숙소 상세
  rest.get('/api/accommodation/:accommodationId', (req, res, ctx) => {
    const { accommodationId } = req.params;

    const data = accommodationData.find(
      (accommodation) => accommodation.id === Number(accommodationId)
    );

    if (!data) {
      return res(
        ctx.status(403),
        ctx.json({
          code: 'ACCOMMODATION_NOT_FOUND',
          status: 'BAD_REQUEST',
          msg: '존재하지 않는 숙소입니다.',
          data: null
        })
      );
    }

    const {
      id,
      accommodationName,
      category,
      address,
      location,
      lat,
      lnt,
      info,
      pictureUrlList,
      room
    } = data;

    return res(
      ctx.status(200),
      ctx.json({
        code: 'RESPONSE_SUCCESS',
        status: 'OK',
        msg: 'SUCCESS',
        data: [
          {
            msg: '성공적으로 작업을 수행 했습니다.'
          },
          {
            id,
            accommodationName,
            category,
            address,
            location,
            lat,
            lnt,
            info,
            pictureUrlList,
            room
          }
        ]
      })
    );
  }),

  // 숙소 예약
  rest.post('api/accommodation/:accommodationId/book', (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        code: 'RESPONSE_SUCCESS',
        status: 'OK',
        msg: 'SUCCESS',
        data: {
          msg: '예약 및 결제가 성공적으로 이루어졌습니다.'
        }
      })
    );
  }),

  // 숙소 리뷰 등록
  rest.post(
    'api/accommodation/:accommodationId/review',
    async (req, res, ctx) => {
      const { accommodationId, rating, description } = await req.json();

      const userId = 99;

      const newData = {
        id: reviewIdCount++,
        userId,
        accommodationId,
        rating,
        description
      };

      reviewData.push(newData);

      return res(
        ctx.status(201),
        ctx.json({
          code: 'RESPONSE_SUCCESS',
          status: 'OK',
          msg: 'SUCCESS',
          data: {
            msg: '성공적으로 리뷰를 작성 했습니다.'
          }
        })
      );
    }
  ),

  // 숙소 리뷰 목록 확인
  rest.get('/api/accommodation/:accommodationId/review', (req, res, ctx) => {
    const page = parseInt(req.url.searchParams.get('page') || '0');
    const pageSize = parseInt(req.url.searchParams.get('pageSize') || '0');

    const startIndex = pageSize * (page - 1);
    const endIndex = startIndex + pageSize;

    return res(
      ctx.status(200),
      ctx.json({
        code: 'RESPONSE_SUCCESS',
        status: 'OK',
        msg: 'SUCCESS',
        data: {
          msg: '성공적으로 작업을 수행 했습니다.'
        },
        content: reviewData.slice(startIndex, endIndex),
        pageable: {
          sort: {
            empty: false,
            sorted: true,
            unsorted: false
          },
          offset: 0,
          pageNumber: page,
          pageSize: pageSize,
          paged: true,
          unpaged: false
        },
        totalElements: reviewData.length,
        totalPages: Math.ceil(reviewData.length / pageSize),
        last: true,
        size: pageSize,
        number: 0,
        sort: {
          empty: false,
          sorted: true,
          unsorted: false
        },
        numberOfElements:
          endIndex <= reviewData.length
            ? pageSize
            : reviewData.length - endIndex,
        first: true,
        empty: false
      })
    );
  }),

  // 숙소 리뷰 수정: 구현 미정

  // 숙소 리뷰 삭제: 구현 미정

  // 숙소 검색
  rest.get('/api/accommodation/:accommodationId', (req, res, ctx) => {
    // 검색 조건에 따른 필터링 로직은 추후 구현
    const keyword = req.url.searchParams.get('keyword');
    const startdate = req.url.searchParams.get('startdate');
    const enddate = req.url.searchParams.get('enddate');
    const people = req.url.searchParams.get('people');
    const sort = req.url.searchParams.get('sort');
    const direction = req.url.searchParams.get('direction');
    const minprice = req.url.searchParams.get('minprice');
    const maxprice = req.url.searchParams.get('maxprice');
    const category = req.url.searchParams.get('category');
    const lat = req.url.searchParams.get('lat');
    const lnt = req.url.searchParams.get('lnt');
    const page = parseInt(req.url.searchParams.get('page') || '0');
    const pageSize = parseInt(req.url.searchParams.get('pageSize') || '0');

    const startIndex = pageSize * (page - 1);
    const endIndex = startIndex + pageSize;

    return res(
      ctx.status(200),
      ctx.json({
        code: 'RESPONSE_SUCCESS',
        status: 'OK',
        msg: 'SUCCESS',
        data: {
          msg: '성공적으로 작업을 수행 했습니다.'
        },
        content: accommodationData,
        pageable: {
          sort: {
            empty: false,
            sorted: true,
            unsorted: false
          },
          offset: 0,
          pageNumber: page,
          pageSize: pageSize,
          paged: true,
          unpaged: false
        },
        totalElements: reviewData.length,
        totalPages: Math.ceil(reviewData.length / pageSize),
        last: true,
        size: pageSize,
        number: 0,
        sort: {
          empty: false,
          sorted: true,
          unsorted: false
        },
        numberOfElements:
          endIndex <= reviewData.length
            ? pageSize
            : reviewData.length - endIndex,
        first: true,
        empty: false
      })
    );
  })
];
