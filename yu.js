const TelegramApi = require('node-telegram-bot-api')
const {gameOption, againOption} = require('./options')
const token = '8184897812:AAELZqp_iy-9avUGPXcMgpgKZge8NXu1iJE'

const bot = new TelegramApi(token, {polling: true})

const chats = {}



const startGame = async (chatId) => {

    await bot.sendMessage(chatId,`угадай цифру от 0 до 9` )
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'НУ', gameOption )

}

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Пояснение'},
        {command: '/info', description: 'secret'},
        {command: '/game', description: 'игрушка'},

    ])

    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        if (text === '/start') {
            await bot.sendSticker(chatId, 'https://data.chpic.su/stickers/c/cybersport_nn/cybersport_nn_011.webp')
            return bot.sendMessage(chatId, `Хули пишешь бармалей`)
        }
        if (text === '/info') {
            return bot.sendMessage(chatId, `Олух - ${msg.from.first_name} ${msg.from.last_name}`);

        }
        if(text === '/game'){
           return startGame(chatId);
        }
        return bot.sendMessage(chatId, 'Чет ты залупу написал)')
    })
    bot.on('callback_query',    async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if(data === '/again'){
        return startGame(chatId)
        }
        if(data === chats[chatId]) {
        return   bot.sendMessage(chatId, `еба ты лаки, ты выбрал ${chats[chatId]}`,againOption);
        } else {
        return   bot.sendMessage(chatId, `еба ты лашок, я выбрал ${chats[chatId]}`,againOption);
        }
    })
}

start()
