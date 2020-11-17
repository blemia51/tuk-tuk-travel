
import axios from 'axios';

import { TIMEOUT } from '../constants/api';
import ApiExecutor from './ApiExecutor';

function apiInstance(baseURL, options) {
  const instance = axios.create({
    baseURL,
    timeout: TIMEOUT,
    ...options
  });

  return instance;
}

export default function api(baseUrl, options) {
  if (options) {
    return new ApiExecutor(apiInstance(baseUrl, options));
  }
  return new ApiExecutor(apiInstance(baseUrl));
}
