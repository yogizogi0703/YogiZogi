import { LocalPlaceProps, PositionProps, fetchLocalAPI } from '../api/map';
import { useEffect, useState } from 'react';

const categorys = ['CS2', 'SW8', 'AT4'];

export const useLocalMap = (position: PositionProps) => {
  const [localData, setLocalData] = useState<LocalPlaceProps[]>([]);

  // 500m 안에 시설 데이터
  useEffect(() => {
    (async () => {
      const newLocalData: LocalPlaceProps[] = [];
      for (let i = 0; i < categorys.length; i++) {
        const res = await fetchLocalAPI(position, categorys[i]);
        if (res) {
          const arr: LocalPlaceProps[] = res.data.documents;
          newLocalData.splice(newLocalData.length, 0, ...arr);
        }
      }
      setLocalData(newLocalData);
    })();
  }, []);

  return { localData };
};
