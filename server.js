// server.js
const express = require('express');
const bodyParser = require('body-parser');
const { Telegraf } = require('telegraf');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/', async (req, res) => {
    const { userAddress } = req.body;

    // Notify Telegram bot
    await notifyTelegramBot(`User connected: ${userAddress}`);

    res.sendStatus(200);
});

async function notifyTelegramBot(message) {
    const botToken = '6585560839:AAFr9I1-qQkLGWt2VWsGiF6EqagT01uMf48';
    const chatId = '6346868382'; // Replace with your Telegram chat ID

    const bot = new Telegraf(botToken);

    try {
        await bot.telegram.sendMessage(chatId, message);
        console.log('Notification sent successfully.');
    } catch (error) {
        console.error('Error sending notification:', error);
    }
}

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
