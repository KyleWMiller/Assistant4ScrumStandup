const { SocketModeClient } = require('@slack/socket-mode');
const { WebClient } = require('@slack/web-api');
require("dotenv").config();


const appToken = process.env.SLACK_APP_TOKEN
const botToken = process.env.SLACK_BOT_TOKEN
const socketModeClient = new SocketModeClient({ appToken })
const webClient = new WebClient(botToken);

socketModeClient.on('command', async ({ event, body, ack }) => {
    try {
        await ack()
    
        console.log(body)
        
    } catch (error) {
        console.log(error)
    }
})

// socketModeClient.on('interactive', async ({ body, ack }) => {
//     await ack();
//     if (event.callback_id === "the-shortcut") {
//       // handle the shortcut here

//         let modal = {
//             trigger_id: body.trigger_id,
//             view: qBlock,
//             accepts_response_payload: true
//         }
        
//         let result = await client.views.open(modal)

//       await webClient.views.open({
//         trigger_id: body.trigger_id,
//         view: {
//           type: "modal",
//           title: {
//             type: "plain_text",
//             text: "My App"
//           },
//           close: {
//             type: "plain_text",
//             text: "Close"
//           },
//           blocks: [
//             {
//               type: "section",
//               text: {
//                 type: "mrkdwn",
//                 text: "Hi there!"
//               }
//             }
//           ]
//         }
//       });
//     }
//   });
  
(async () => {
    let port = 3000
    // Connect to Slack
    await socketModeClient.start()
    console.log(`⚡️ Slack app is running on port ${port}!`);
  })();