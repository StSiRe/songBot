import { Bot } from 'grammy'

// 1. Create a bot
const bot = new Bot(process.env.TG_TOKEN as string)

// 2. Reply to text messages with the received text
//bot.on('message:text', ctx => ctx.reply(ctx.message.text))

bot.on("message", async (ctx) => {
    // `txt` will be a `string` when processing text messages.
    // It will be `undefined` if the received message does not have any message text,
    // e.g. photos, stickers, and other messages.
    const txt = ctx.from.id + " " + ctx.from.first_name + " " + ctx.from.username;

    await ctx.reply(txt);
});

//bot.command('/start', (ctx) => ctx.reply(ctx.from.first_name));
// 3. Start the bot
bot.start()