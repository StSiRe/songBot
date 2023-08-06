import {Bot, InlineKeyboard, Keyboard} from 'grammy'
//import {text} from "express";
//import {json} from "express";

class Songs {
    private list = [
        ["Мы никогда не умрем!", "dfsdf \n dsdsfd", "you.tu/fdsfdsf"],
        ["Мы умрем!", "dffdsfsdf \n aaaaa", "you.tu/aaaaa"],
        ["Слава Андрею!", "Андрею \n слава", "https://www.youtube.com/watch?v=dQw4w9WgXcQ"]
    ];
    getListNamesSongs() {
        let names: string[] = ["AAAA", "BBBB", "CCCC"];
        // for(let i=0; i < this.list.length - 1; i++)
        // {
        //     names.push(this.list[i][0]);
        // }
        console.log(names);
        return names;
    }

    // getTextOfSong(id: number) {
    //     let texts: string[];
    //     for (let item in this.list) {
    //         texts.push(item[1]);
    //     }
    //     return texts;
    // }
    //
    // getVideoLinkOfSong(id: number) {
    //     let links: string[];
    //     for (let item in this.list) {
    //         links.push(item[2]);
    //     }
    //     return links;
    // }
}
const songs = new Songs();



// 1. Create a bot
const bot = new Bot(process.env.TG_TOKEN as string)

// 2. Reply to text messages with the received text
//bot.on('message:text', ctx => ctx.reply(ctx.message.text))
bot.command("start", async(ctx) => {
    const id = ctx.chat.id;
    const text_hello = "Привет, " + ctx.from.first_name + "!";
    const text_description = "Меня зовут songBot и я знаю тексты и танцы любимых ЯвДельских песен";

    const inlineKeyboard = new InlineKeyboard().text("Погнали", "click-button-search");

    await bot.api.sendMessage(id, text_hello);
    await bot.api.sendMessage(id, text_description);
    await bot.api.sendMessage(id,"Погнали петь?", {reply_markup: inlineKeyboard});
});

bot.callbackQuery("click-button-search", async (ctx) => {
    const id = ctx.chat.id;

    await bot.api.sendMessage(id, "Вот список песен:");

    const listOfSongs = songs.getListNamesSongs();

    const countSongs: number = listOfSongs.length;
    let text: string = "";
    for(let i =0; i < countSongs; i++){
        text+= (i + ". " + listOfSongs[i]+"\n");
    }
    const labels = [
        "Yes, they certainly are",
        "I'm not quite sure",
        "No. 😈",
        "Yes, they certainly are",
        "I'm not quite sure",
        "No. 😈",
        "Yes, they certainly are",
        "I'm not quite sure",
        "No. 😈",
    ];
    const buttonRows = labels
        .map((label) => [Keyboard.text(label)]);
    const keyboard = Keyboard.from(buttonRows).resized();
    await bot.api.sendMessage(id, "s", {reply_markup: keyboard});
    await bot.api.sendMessage(id, "Можешь пролистывать его при помощи кнопок снизу");
});


bot.command("add", async(ctx) => {
    const id = ctx.chat.id;
    const text_hello = "Привет, " + ctx.from.first_name + "!";
    const text_description = "Ого, ты хочешь добавить песню? Что ж, давай я тебе в этом помогу)";
    const labelDataPairs = [
        ["« 1", "first"],
        ["‹ 3", "prev"],
        ["· 4 ·", "stay"],
        ["5 ›", "next"],
        ["31 »", "last"],
    ];
    const buttonRow = labelDataPairs
        .map(([label, data]) => InlineKeyboard.text(label, data));
    const keyboard = InlineKeyboard.from([buttonRow]);
    await bot.api.sendMessage(id, text_hello);
    await bot.api.sendMessage(id, text_description);

    await bot.api.sendMessage(id, "Подскажи, будет ли к песне", {reply_markup: keyboard});
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