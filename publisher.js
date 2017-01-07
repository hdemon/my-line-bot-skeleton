const redis = require('redis');
const client = redis.createClient();

class Publisher {
  constructor(queueName) {
    this.queueName = queueName;
  }

  enqueue(vaule) {
    client.lpush(this.queueName, value);
  }
}

module.exports = Publisher;
