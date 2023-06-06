export const GetGeoInfo = (setGeoInfo : React.Dispatch<React.SetStateAction<number[]>>) => {
  navigator.geolocation.getCurrentPosition(function (position) {
    const newLocation = [position.coords.latitude, position.coords.longitude];
    setGeoInfo(newLocation)
  });

  return null;
};
