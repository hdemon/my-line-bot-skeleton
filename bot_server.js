const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const Publisher = require('./publisher');

const app = express();
const publisher = new Publisher({ queueName: 'event' });
const channelSecret = process.env['LINE_BOT_CHANNEL_SECRET'];
const textBodyParser = bodyParser.text({ type: '*/*' });

const isValidSender = (req) => {
    const signature = req.get('X-Line-Signature');
    const hmac = crypto.createHmac('sha256', channelSecret);
    hmac.update(req.body);
    return hmac.digest('base64') === signature;
};

app.post('/callback', textBodyParser, (req, res) => {
  if (!isValidSender(req)) {
    res.sendStatus(400);
  }
  res.sendStatus(200);

  const events = JSON.parse(req.body)['events'];
  events.forEach((event) => publisher.enqueue(event));
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
