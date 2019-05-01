'use strict';

const getQueue = require('./getQueue');

class InMemoryPublisher {
  async initialize ({ exchangeName }) {
    if (!exchangeName) {
      throw new Error('Exchange name is missing.');
    }

    this.queue = getQueue({ exchangeName });
  }

  async publishMessage ({ message }) {
    this.queue.write({ message });
  }
}

module.exports = InMemoryPublisher;