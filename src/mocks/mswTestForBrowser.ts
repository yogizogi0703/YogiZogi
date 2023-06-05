export const mswTest = async () => {
  try {
    await fetch('/login')
      .then((res) => res.json())
      .then((data) => console.log('login  ', data));

    await fetch('/search/1')
      .then((res) => res.json())
      .then((data) => console.log('category  ', data));

    // 현재 위치기반 정렬
    await fetch('/search?sort=distance')
      .then((res) => res.json())
      .then((data) => console.log('distance  ', data));

    await fetch(
      '/search?keyword=Hilton/startdate=2023-06-01&enddate=2023-06-30&people=2'
    )
      .then((res) => res.json())
      .then((data) => console.log('keyword  ', data));

    await fetch(
      '/search?keyword=Hilton/startdate=2023-06-01&enddate=2023-06-30&people=2&minprice=10000&maxprice=4000000'
    )
      .then((res) => res.json())
      .then((data) => console.log('priceOption  ', data));

    await fetch(
      '/search?keyword=Hilton/startdate=2023-06-01&enddate=2023-06-30&people=2&sort=priceasc'
    )
      .then((res) => res.json())
      .then((data) => console.log('priceAscOption', data));

    await fetch(
      '/search?keyword=Hilton/startdate=2023-06-01&enddate=2023-06-30&people=2&sort=pricedesc'
    )
      .then((res) => res.json())
      .then((data) => console.log('prioceDescOption  ', data));

    await fetch(
      '/search?keyword=Hilton/startdate=2023-06-01&enddate=2023-06-30&people=2&sort=rateasc'
    )
      .then((res) => res.json())
      .then((data) => console.log('rateAsc  ', data));

    await fetch(
      '/search?keyword=Hilton/startdate=2023-06-01&enddate=2023-06-30&people=2&sort=ratedesc'
    )
      .then((res) => res.json())
      .then((data) => console.log('rateDesc  ', data));

    // 숙박시설 검색 후 현재 위치와 가까운 순 정렬
    await fetch(
      '/search?keyword=Hilton/startdate=2023-06-01&enddate=2023-06-30&people=2&sort=distance'
    )
      .then((res) => res.json())
      .then((data) => console.log('distanceOption  ', data));
  } catch (error) {
    console.log(error);
  }
};
