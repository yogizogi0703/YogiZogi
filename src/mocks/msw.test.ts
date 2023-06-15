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
      accommodationName: 'ABC 호텔',
      category: 1,
      address: '서울 중구 쌍림동 155-1',
      location: '강남구 역삼동',
      lat: 37.50252991,
      lnt: 127.0382753,
      info: '혜택안내~~~ 주차장 정보~~ 지하철정보~~ 객체내부시설……',
      pictureUrlList: [
        '//image.goodchoice.kr/resize_370x220/adimg_new/49914/329560/874943ee5c604e46a4f529d8ecc1558d.jpg',
        '//image.goodchoice.kr/resize_370x220/adimg_new/49914/329560/874943ee5c604e46a4f529d8ecc1558d.jpg'
      ],
      room: [
        {
          id: 1,
          name: 'Standard Double',
          inTime: 15,
          outTime: 13,
          price: 80000,
          pictureUrlList: [
            '//image.goodchoice.kr/resize_370x220/adimg_new/49914/329560/874943ee5c604e46a4f529d8ecc1558d.jpg'
          ]
        },
        {
          id: 2,
          name: 'Deluxe',
          inTime: 15,
          outTime: 13,
          price: 85000,
          pictureUrlList: [
            '//image.goodchoice.kr/resize_370x220/adimg_new/49914/329560/874943ee5c604e46a4f529d8ecc1558d.jpg'
          ]
        }
      ]
    };

    const {
      data: { data }
    } = await axios('/api/accommodation/1');

    expectTypeOf(data).toBeArray();
    expectTypeOf(data[1]).toBeObject();
    expect(data[1]).toEqual(result);
  });

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
        customerId: 17,
        sellerId: null,
        accommodationId: 1,
        rating: 8,
        description: '별점 준 이유'
      },
      {
        id: 18,
        customerId: 18,
        sellerId: null,
        accommodationId: 1,
        rating: 7,
        description: '별점 준 이유'
      }
    ];

    const {
      data: { content }
    } = await axios('/api/accommodation/1/review?page=1&pageSize=3');

    expectTypeOf(content).toBeArray();
    for (let i = 0; i < result.length; i++) {
      expectTypeOf(content[i]).toBeObject();
      expect(content[i]).toEqual(result[i]);
    }
  });
});
