const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const crypto = require('crypto');
const Queue = require('./queue');

const channelSecret = process.env['LINE_BOT_CHANNEL_SECRET'];
const textBodyParser = bodyParser.text({ type: '*/*' });
const queue = new Queue;

const isValidSender = (req) => {
  const signature = req.get('X-Line-Signature');
  const hmac = crypto.createHmac('sha256', channelSecret);
  hmac.update(req.body);
  return hmac.digest('base64') === signature;
}

app.post('/callback', textBodyParser, (req, res) => {
  console.log(req.body);
  if (!isValidSender(req)) {
    res.sendStatus(400);
  }
  res.sendStatus(200);

  const events = JSON.parse(req.body)['events'];
  events.forEach(queue.enqueue);
  console.log(queue.list());
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
