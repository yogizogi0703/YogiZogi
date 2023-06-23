import axios from 'axios';

export const BASE_URL = '/api';

export const fetchData = {
  get: async <T>(url: string) => {
    try {
      const res: T = await axios(`${BASE_URL}${url}`);
      return res;
    } catch (error) {
      console.error(
        `GET:// fetchData Error : TIME(${new Date()}) ERRROR(${error})`
      );
    }
  },

  post: async <T>(url: string, data: T) => {
    try {
      const res = await axios({
        method: 'post',
        url: `${BASE_URL}${url}`,
        headers: {
          'Content-Type': 'application/json'
        },
        data
      });
      return res;
    } catch (error) {
      console.error(
        `POST:// fetchData Error : TIME(${new Date()}) ERRROR(${error})`
      );
    }
  },

  delete: async (url: string) => {
    try {
      const res = await axios({
        method: 'delete',
        url: `${BASE_URL}${url}`
      });
      return res;
    } catch (error) {
      console.error(
        `DELETE:// fetchData Error : TIME(${new Date()}) ERRROR(${error})`
      );
    }
  }
};
