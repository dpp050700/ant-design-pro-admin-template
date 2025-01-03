import { message } from 'antd';
import { API_BASE_URL } from '../libs/constants';
import { ConfigurationParameters, FetchAPI } from './';
import { LanguageOptions } from '@/constants/index';
import { LANGUAGE, TOKEN } from '@/constants/localStorage';

const fetchApi: FetchAPI = (url, options) => {
  return fetch(`${url}`, options);
};
const defaultConfiguration: ConfigurationParameters = {
  basePath: API_BASE_URL, //API_BASE_URL,
  fetchApi: fetchApi,
  // TODO
  middleware: [
    {
      post: async (value) => {
        const response = value.response.clone();
        const data = await value.response.json();
        if (
          (response && response.status < 200) ||
          response.status >= 300 ||
          (data.bizCode && data.bizCode !== 0)
        ) {
          if (data.code === 100100 || data.code === 100102) {
            // token not found
            message.error('请重新登录～');
            // useLoginStore.setState({ isLogin: false, token: "" });
            window.location.href = '/login';
          } else {
            message.error(data.message || 'error');
          }
        }

        return response;
      },
      pre: async (context) => {
        const Language =
          LanguageOptions.find((item) => item.key === localStorage.getItem(LANGUAGE))?.value ||
          LanguageOptions[0].value;
        if (!context || !context.init || !context.init.headers) {
          context.init = {
            headers: {
              Authorization: localStorage.getItem(TOKEN) || '',
              Language,
            },
          };
        } else {
          const headers: any = context.init.headers;
          headers['Authorization'] = localStorage.getItem(TOKEN) || '';
          headers['Language'] = Language;
        }
        return context;
      },
    },
  ],
};

export default defaultConfiguration;
