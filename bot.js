const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const token = "8760309582:AAFWE6h0SWcbZypvSQ2Y9tq6RZPeno65jEM";
const apiKey = "YOUR_OPENAI_API_KEY";

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "🤖 AI Bot ready! তুমি যি question কৰিবা মই answer দিম।");
});

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text.startsWith('/start')) return;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: text }]
      },
      {
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        }
      }
    );

    const answer = response.data.choices[0].message.content;
    bot.sendMessage(chatId, answer);

  } catch (err) {
    bot.sendMessage(chatId, "❌ Error হৈছে, পাছত try কৰা");
  }
});
