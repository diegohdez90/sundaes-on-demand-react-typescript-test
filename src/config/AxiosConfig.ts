import axios from 'axios';

if (typeof process !== undefined) {
  axios.defaults.adapter = require('axios/lib/adapters/http');
}

export default axios;
