import axios from 'axios';

import config from '../config';

const instance = axios.create({
  baseURL: config.ApiBaseUrl,
  headers: {
    'Content-type': 'application/json',
  },
});

export default instance;
