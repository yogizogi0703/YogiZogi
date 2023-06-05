interface sortedPlacesProps {
    categoryId: number,
    accomodationId: number,
    name: string,
    rate: number,
    accomodationImage: string,
    address: string,
    price: number,
    lat:number,
    lon: number,
}

function haversine(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; 
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.asin(Math.sqrt(a));
  return R * c;
}

export const sortedPlaces = (places: sortedPlacesProps[], userLat: number, userLog:number) => {
  return places.map((el) => {
      const distance = haversine(userLat, userLog, el.lat, el.lon);
      return { ...el, distance };
    })
    .sort((a, b) => a.distance - b.distance);
};
