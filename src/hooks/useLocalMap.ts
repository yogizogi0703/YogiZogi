import { LocalPlaceProps, PositionProps, fetchLocalAPI } from '../api/map';
import { useEffect, useState } from 'react';

interface LocalCategoryProps {
  category: string;
  title: string;
}
const categorys = ['CS2', 'SW8', 'AT4'];

export const useLocalMap = (position: PositionProps) => {
  const [localData, setLocalData] = useState<LocalPlaceProps[]>([]);
  const [localCategory, setLocalCategory] = useState<LocalCategoryProps[]>([]);

  // 500m 안에 시설 데이터
  useEffect(() => {
    (async () => {
      const newLocalCategory: LocalCategoryProps[] = [];
      const newLocalData: LocalPlaceProps[] = [];
      for (let i = 0; i < categorys.length; i++) {
        const res = await fetchLocalAPI(position, categorys[i]);
        if (res) {
          const arr: LocalPlaceProps[] = res.data.documents;
          if (arr.length > 0) {
            newLocalCategory.push({
              category: categorys[i],
              title: arr[0].category_group_name
            });
          }
          newLocalData.splice(newLocalData.length, 0, ...arr);
        }
      }

      setLocalCategory(newLocalCategory);
      setLocalData(newLocalData);
    })();
  }, []);

  return { localData, localCategory };
};
