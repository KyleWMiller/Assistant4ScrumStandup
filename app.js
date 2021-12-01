const { App } = require("@slack/bolt");
const fs = require('fs')
require("dotenv").config();


// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.APP_TOKEN,
});

// Using an obj for our DB (for now? possibly forever???)
let rawStorage = fs.readFileSync('db.json')
let storage = JSON.parse(rawStorage)

// Standup modal form
let rawBlock = fs.readFileSync('standup-block.json')
let qBlock = JSON.parse(rawBlock)

// Main Command logic
app.command("/standup", async ({ payload, context, client, ack, respond, body }) => {
    // console.log('body', body)
    // console.log('***')
    // console.log('payload', payload)
    // console.log('***')
    // console.log('context', context)
    try {
      await ack();

      let modal = {
          trigger_id: body.trigger_id,
          view: qBlock,
          accepts_response_payload: true
      }

      let result = await client.views.open(modal)
      console.log('=========================')
      console.log('result', result.view.state)
      console.log('=========================')
    //   let acknowledgement = await ack()
    //   console.log('ack', acknowledgement)
      let res = await respond()
      console.log()
    } catch (error) {
        console.log("err")
      console.error(error);
    }
});

app.message(/hey/, async ({ message, say }) => {
    console.log(message, 'message')
    let user = message.user
    try {
      say(`Whale, hello there yourself <@${user}>`);
    } catch (error) {
        console.log("err")
      console.error(error);
    }
});

(async () => {
  const port = 3000
  // Start your app
  await app.start(process.env.PORT || port);
  console.log(`⚡️ Slack Bolt app is running on port ${port}!`);
})();