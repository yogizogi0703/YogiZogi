import { axiosInstance } from '../api';
import { useEffect } from 'react';
import useModal from './useModal';

const useCustomInterceptor = () => {
  const { openModal } = useModal();
  /**
   * axios interceptor
   * 공통 error handling
   */
  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      (res) => res,
      (error) => {
        console.error(
          `${error.config.method.toUpperCase()}:// fetchData Error : TIME(${new Date()}) ERRROR(${
            error.response.data.code
          })`
        );
        if (error.config.method !== 'get') {
          openModal({ content: error.response.data.msg });
        }
      }
    );

    // 언마운트
    return () => {
      axiosInstance.interceptors.request.eject(interceptor);
    };
  }, []);
};

export default useCustomInterceptor;
