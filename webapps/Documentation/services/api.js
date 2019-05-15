'use strict';

const axios = require('axios');

/* eslint-disable no-process-env */
const apiUrl = process.env.API_URL || 'http://localhost:3000';
/* eslint-enable no-process-env */

const api = {
  async get ({ path, avoidCache = false } = {}) {
    if (!path) {
      throw new Error('Path is missing.');
    }

    let url = `${apiUrl}/api/v2/${path}`;

    if (avoidCache) {
      url = `${url}?_=${Date.now()}`;
    }

    const response = await axios.get(url);

    if (response.status === 200) {
      return response.data;
    }

    throw new Error(`Get request for API path ${path} failed.`);
  }
};

module.exports = api;
