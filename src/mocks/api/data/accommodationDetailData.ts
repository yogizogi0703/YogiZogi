export const accommodationDetailData = new Array(30)
  .fill(null)
  .map((_, idx) => {
    const names = [
      '역삼 인트로호텔',
      '강남 더 뮤즈',
      '역삼 브라운도트',
      '역삼 마리호텔',
      '역삼 사월호텔',
      '역삼 벤',
      '강남 타라',
      '역삼 PREMIER XYM',
      '선릉 그레이호텔',
      '강남 봄',
      '역삼 CF호텔',
      '강남 멜리샤호텔',
      '역삼 H Avenue-역삼점',
      '역삼 아마레',
      '삼성 캘리포니아',
      '강남 제리스플래닛',
      '역삼 호텔 디 아티스트',
      '삼성 JS',
      '역삼 리치웰',
      '대치 컬리넌',
      '강남 캠퍼스',
      '강남 블랑',
      '역삼 컬리넌',
      '강남 녹스 호텔',
      '역삼 스타 프리미어',
      '삼성 라엠-LaM',
      '선릉 호텔 스타',
      '논현 올인',
      '개포 컬리넌',
      '강남 카파쓰'
    ];

    const accommodationIds = [
      5, 1, 13, 18, 31, 30, 89, 6, 51, 8, 32, 27, 25, 90, 88, 24, 2, 19, 3, 21,
      4, 85, 7, 12, 28, 35, 33, 83, 37, 17, 9
    ];

    const price = [
      30000, 40000, 35000, 0, 0, 30000, 40000, 25000, 30000, 40000, 30000,
      30000, 25000, 30000, 35000, 30000, 30000, 40000, 29800, 30000, 40000,
      20000, 29800, 25000, 25000, 30000, 30000, 35000, 35000, 48800, 35000
    ];
    const rate = [
      9.9, 9.8, 9.7, 9.7, 9.6, 9.6, 9.6, 9.5, 9.5, 9.5, 9.5, 9.5, 9.4, 9.4, 9.4,
      9.4, 9.3, 9.3, 9.3, 9.3, 9.3, 9.3, 9.3, 9.3, 9.3, 9.3, 9.2, 9.2, 9.2, 9.2,
      9.2
    ];
    return {
      id: accommodationIds[idx],
      accommodationName: names[idx],
      category: 1,
      rate: rate[idx],
      address: '서울 강남구 역삼동 678-9',
      region: '강남구 역삼동',
      picUrl:
        '//image.goodchoice.kr/resize_370x220/adimg_new/49914/329560/874943ee5c604e46a4f529d8ecc1558d.jpg',
      lat: 37.50252991,
      lon: 127.0382753,
      info: '<article class="detail_info">\n<!-- 기본 정보 -->\n<h3 class="category" id="default_info_tab" type="h3"><span>기본 정보</span></h3>\n<section class="default_info">\n<!-- 사장님 한마디 & 추천이유 -->\n<div class="comment_mobile">\n<h3>사장님 한마디</h3>\n                    * 골드글라스/브론즈글',
      picUrlList: [
        {
          id: 96,
          url: '//image.goodchoice.kr/resize_370x220/adimg_new/49914/329560/874943ee5c604e46a4f529d8ecc1558d.jpg'
        },
        {
          id: 72,
          url: '//image.goodchoice.kr/resize_370x220/adimg_new/49914/329560/874943ee5c604e46a4f529d8ecc1558d.jpg'
        },
        {
          id: 45,
          url: '//image.goodchoice.kr/resize_370x220/adimg_new/49914/329560/874943ee5c604e46a4f529d8ecc1558d.jpg'
        },
        {
          id: 129,
          url: '//image.goodchoice.kr/resize_370x220/adimg_new/49914/329560/874943ee5c604e46a4f529d8ecc1558d.jpg'
        },
        {
          id: 68,
          url: '//image.goodchoice.kr/resize_370x220/adimg_new/49914/329560/874943ee5c604e46a4f529d8ecc1558d.jpg'
        },
        {
          id: 74,
          url: '//image.goodchoice.kr/resize_370x220/adimg_new/49914/329560/874943ee5c604e46a4f529d8ecc1558d.jpg'
        },
        {
          id: 12,
          url: '//image.goodchoice.kr/resize_370x220/adimg_new/49914/329560/874943ee5c604e46a4f529d8ecc1558d.jpg'
        }
      ],
      rooms: [
        {
          id: 1,
          roomName: '랜덤객실',
          checkInTime: '23',
          cheekOutTime: '12',
          defaultPeople: 2,
          maxPeople: 2,
          pictureUrlList: [
            {
              id: 7,
              url: '//image.goodchoice.kr/resize_370x220/adimg_new/49914/329560/874943ee5c604e46a4f529d8ecc1558d.jpg'
            },
            {
              id: 3,
              url: '//image.goodchoice.kr/resize_370x220/adimg_new/49914/329560/874943ee5c604e46a4f529d8ecc1558d.jpg'
            },
            {
              id: 1,
              url: '//image.goodchoice.kr/resize_370x220/adimg_new/49914/329560/874943ee5c604e46a4f529d8ecc1558d.jpg'
            }
          ],
          price: 280000
        },
        {
          id: 2,
          roomName: '로이',
          checkInTime: '23',
          cheekOutTime: '12',
          defaultPeople: 2,
          maxPeople: 2,
          pictureUrlList: [
            {
              id: 11,
              url: '//image.goodchoice.kr/resize_370x220/adimg_new/49914/329560/874943ee5c604e46a4f529d8ecc1558d.jpg'
            },
            {
              id: 15,
              url: '//image.goodchoice.kr/resize_370x220/adimg_new/49914/329560/874943ee5c604e46a4f529d8ecc1558d.jpg'
            },
            {
              id: 10,
              url: '//image.goodchoice.kr/resize_370x220/adimg_new/49914/329560/874943ee5c604e46a4f529d8ecc1558d.jpg'
            }
          ],
          price: 280000
        },
        {
          id: 3,
          roomName: '샴페인골드',
          checkInTime: '23',
          cheekOutTime: '12',
          defaultPeople: 2,
          maxPeople: 2,
          pictureUrlList: [
            {
              id: 22,
              url: '//image.goodchoice.kr/resize_370x220/adimg_new/49914/329560/874943ee5c604e46a4f529d8ecc1558d.jpg'
            },
            {
              id: 20,
              url: '//image.goodchoice.kr/resize_370x220/adimg_new/49914/329560/874943ee5c604e46a4f529d8ecc1558d.jpg'
            },
            {
              id: 24,
              url: '//image.goodchoice.kr/resize_370x220/adimg_new/49914/329560/874943ee5c604e46a4f529d8ecc1558d.jpg'
            }
          ],
          price: 280000
        },
        {
          id: 4,
          roomName: '미스트',
          checkInTime: '23',
          cheekOutTime: '12',
          defaultPeople: 2,
          maxPeople: 2,
          pictureUrlList: [
            {
              id: 31,
              url: '//image.goodchoice.kr/resize_370x220/adimg_new/49914/329560/874943ee5c604e46a4f529d8ecc1558d.jpg'
            },
            {
              id: 30,
              url: '//image.goodchoice.kr/resize_370x220/adimg_new/49914/329560/874943ee5c604e46a4f529d8ecc1558d.jpg'
            },
            {
              id: 35,
              url: '//image.goodchoice.kr/resize_370x220/adimg_new/49914/329560/874943ee5c604e46a4f529d8ecc1558d.jpg'
            }
          ],
          price: 280000
        },
        {
          id: 5,
          roomName: '에메랄드',
          checkInTime: '23',
          cheekOutTime: '12',
          defaultPeople: 2,
          maxPeople: 2,
          pictureUrlList: [
            {
              id: 48,
              url: '//image.goodchoice.kr/resize_370x220/adimg_new/49914/329560/874943ee5c604e46a4f529d8ecc1558d.jpg'
            },
            {
              id: 47,
              url: '//image.goodchoice.kr/resize_370x220/adimg_new/49914/329560/874943ee5c604e46a4f529d8ecc1558d.jpg'
            },
            {
              id: 44,
              url: '//image.goodchoice.kr/resize_370x220/adimg_new/49914/329560/874943ee5c604e46a4f529d8ecc1558d.jpg'
            }
          ],
          price: 280000
        },
        {
          id: 6,
          roomName: '아쿠아',
          checkInTime: '23',
          cheekOutTime: '12',
          defaultPeople: 2,
          maxPeople: 2,
          pictureUrlList: [
            {
              id: 59,
              url: '//image.goodchoice.kr/resize_370x220/adimg_new/49914/329560/874943ee5c604e46a4f529d8ecc1558d.jpg'
            },
            {
              id: 60,
              url: '//image.goodchoice.kr/resize_370x220/adimg_new/49914/329560/874943ee5c604e46a4f529d8ecc1558d.jpg'
            },
            {
              id: 57,
              url: '//image.goodchoice.kr/resize_370x220/adimg_new/49914/329560/874943ee5c604e46a4f529d8ecc1558d.jpg'
            }
          ],
          price: 280000
        },
        {
          id: 7,
          roomName: '다이아골드',
          checkInTime: '23',
          cheekOutTime: '12',
          defaultPeople: 2,
          maxPeople: 2,
          pictureUrlList: [
            {
              id: 66,
              url: '//image.goodchoice.kr/resize_370x220/adimg_new/49914/329560/874943ee5c604e46a4f529d8ecc1558d.jpg'
            },
            {
              id: 68,
              url: '//image.goodchoice.kr/resize_370x220/adimg_new/49914/329560/874943ee5c604e46a4f529d8ecc1558d.jpg'
            },
            {
              id: 69,
              url: '//image.goodchoice.kr/resize_370x220/adimg_new/49914/329560/874943ee5c604e46a4f529d8ecc1558d.jpg'
            }
          ],
          price: 350000
        },
        {
          id: 8,
          roomName: '비앙코',
          checkInTime: '23',
          cheekOutTime: '12',
          defaultPeople: 2,
          maxPeople: 2,
          pictureUrlList: [
            {
              id: 73,
              url: '//image.goodchoice.kr/resize_370x220/adimg_new/49914/329560/874943ee5c604e46a4f529d8ecc1558d.jpg'
            },
            {
              id: 75,
              url: '//image.goodchoice.kr/resize_370x220/adimg_new/49914/329560/874943ee5c604e46a4f529d8ecc1558d.jpg'
            },
            {
              id: 74,
              url: '//image.goodchoice.kr/resize_370x220/adimg_new/49914/329560/874943ee5c604e46a4f529d8ecc1558d.jpg'
            }
          ],
          price: 350000
        },
        {
          id: 9,
          roomName: '브론즈글라스',
          checkInTime: '23',
          cheekOutTime: '12',
          defaultPeople: 2,
          maxPeople: 2,
          pictureUrlList: [
            {
              id: 83,
              url: '//image.goodchoice.kr/resize_370x220/adimg_new/49914/329560/874943ee5c604e46a4f529d8ecc1558d.jpg'
            },
            {
              id: 87,
              url: '//image.goodchoice.kr/resize_370x220/adimg_new/49914/329560/874943ee5c604e46a4f529d8ecc1558d.jpg'
            },
            {
              id: 85,
              url: '//image.goodchoice.kr/resize_370x220/adimg_new/49914/329560/874943ee5c604e46a4f529d8ecc1558d.jpg'
            }
          ],
          price: 490000
        },
        {
          id: 10,
          roomName: '골드글라스',
          checkInTime: '23',
          cheekOutTime: '12',
          defaultPeople: 2,
          maxPeople: 2,
          pictureUrlList: [
            {
              id: 94,
              url: '//image.goodchoice.kr/resize_370x220/adimg_new/49914/329560/874943ee5c604e46a4f529d8ecc1558d.jpg'
            },
            {
              id: 95,
              url: '//image.goodchoice.kr/resize_370x220/adimg_new/49914/329560/874943ee5c604e46a4f529d8ecc1558d.jpg'
            },
            {
              id: 93,
              url: '//image.goodchoice.kr/resize_370x220/adimg_new/49914/329560/874943ee5c604e46a4f529d8ecc1558d.jpg'
            }
          ],
          price: 400000
        }
      ]
    };
  });
