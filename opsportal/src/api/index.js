import axios from 'axios';


export const jobsClient = axios.create({
    baseURL: 'https://c2fb07ec-7290-4cd2-8ee6-10ab3310c8af.mock.pstmn.io',
    timeout: 10000,
  });
  