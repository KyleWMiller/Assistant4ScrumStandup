const { RTMClient } = require('@slack/rtm-api');
require('dotenv').config()

const token = process.env.SLACK_BOT_TOKEN;
const rtm = new RTMClient(token);


(async () => {
    // Connect to Slack
    const { self, team } = await rtm.start();
  })();