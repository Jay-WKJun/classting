import axios from 'axios';
import { camelizeKeys } from 'humps';

axios.interceptors.response.use((res) => ({
  ...res,
  data: camelizeKeys(res.data),
}));
