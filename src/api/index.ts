import axios from 'axios';

export const BASE_URL = '/api';

export const fetchData = {
  get: async (url: string) => {
    try {
      const res = await axios(`${BASE_URL}${url}`);
      return res;
    } catch (error) {
      console.log(error);
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
      console.log(error);
    }
  }
};
