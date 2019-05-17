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

    try {
      const response = await axios.get(url);

      return response.data;
    } catch (ex) {
      throw new Error(`Get request for API path ${path} failed. Server responded with status ${ex.response.status}.`);
    }
  }
};

module.exports = api;
