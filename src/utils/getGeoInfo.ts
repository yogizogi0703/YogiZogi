import { SearchProps } from 'components/common/SearchBar';

export const GetGeoInfo = (
  setSearch: React.Dispatch<React.SetStateAction<SearchProps>>
) => {
  navigator.geolocation.getCurrentPosition(function (position) {
    const newLocation = [position.coords.latitude, position.coords.longitude];
    setSearch((prev) => {
      return { ...prev, userGeoInfo: newLocation };
    });
  });

  return null;
};
