import { Bot } from 'grammy'

// 1. Create a bot
const bot = new Bot(process.env.TG_TOKEN as string)

// 2. Reply to text messages with the received text
bot.on('message:text', ctx => ctx.reply(ctx.message.text))


bot.command('start', (ctx) => ctx.reply(ctx.from.first_name));
// 3. Start the bot
bot.start()