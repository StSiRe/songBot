import {Bot, InlineKeyboard} from 'grammy'
//import {text} from "express";
//import {json} from "express";

// 1. Create a bot
const bot = new Bot(process.env.TG_TOKEN as string)

// 2. Reply to text messages with the received text
//bot.on('message:text', ctx => ctx.reply(ctx.message.text))
bot.command("start", async(ctx) => {
    const id = ctx.chat.id;
    const text_hello = "Привет, " + ctx.from.first_name + "!";
    const text_description = "Меня зовут songBot и я знаю тексты и танцы любимых ЯвДельских песен";

    const inlineKeyboard = new InlineKeyboard().text("click", "click-payload");

    await bot.api.sendMessage(id, text_hello);
    await bot.api.sendMessage(id, text_description);
    await bot.api.sendMessage(id,"Погнали петь?", {reply_markup: inlineKeyboard});
});


bot.command("search", async(ctx) => {
    const id = ctx.chat.id;
    const text_hello = "Привет, " + ctx.from.first_name + "!";
    const text_description = "Меня зовут songBot и я знаю тексты и танцы любимых ЯвДельских песен";
    const text_actions_description = "Нажми /search для поиска среди моей библиотеки)";

    await bot.api.sendMessage(id, text_hello);
    await bot.api.sendMessage(id, text_description);
    await bot.api.sendMessage(id, text_actions_description);
});
bot.on("message", async (ctx) => {
    // `txt` will be a `string` when processing text messages.
    // It will be `undefined` if the received message does not have any message text,
    // e.g. photos, stickers, and other messages.
    const txt = ctx.from;

    const text = JSON.stringify(txt);


    await ctx.reply(text);
});


//bot.command('/start', (ctx) => ctx.reply(ctx.from.first_name));
// 3. Start the bot
bot.start()