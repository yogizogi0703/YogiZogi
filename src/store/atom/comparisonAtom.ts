import { ISearchResultContent } from "api/search";
import { atom } from "recoil";

export const selectedAccommodation = atom({
  key: 'selectedAccommodation',
  default: [] as ISearchResultContent[]
})