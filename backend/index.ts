import {Bot, InlineKeyboard, Keyboard} from 'grammy'
//import {text} from "express";
//import {json} from "express";

let userAddingID: number[] = [-1];
let userAddingStage: number = 0;//0-nothing 1- has name 2-has text 3- has video link
let userAddingSongData: string[] = [ "", "", ""];

class Songs {
    private list:string[][] =[];
    getListNamesSongs() {
        let names: string[] = [];
        for(let i=0; i < this.list.length; i++)
        {
            names.push(this.list[i][0]);
        }
        console.log(names);
        return names;
    }

    getTextOfSong(name: string) {
        let texts: string = "";
        for(let i=0; i < this.list.length; i++)
        {
            if(this.list[i][0] == name)
            {
                texts = this.list[i][1];
            }
        }
        return texts;
    }

    appendSong(name: string, text:string, link:string)
    {
        this.list.push([name, text, link]);
        console.log(this.list);
    }
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
async function showSongsList(id: number)
{
    const listOfSongs = songs.getListNamesSongs();

    listOfSongs.push("Назад");

    const buttonRows = listOfSongs
        .map((label) => [Keyboard.text(label)]);
    const keyboard = Keyboard.from(buttonRows).resized();

    keyboard.one_time_keyboard = true;

    await bot.api.sendMessage(id, "Нажми на кнопку - получишь результат", {reply_markup: keyboard});
}

bot.callbackQuery("click-button-search", async (ctx) => {
    const id = ctx.chat.id;
    await showSongsList(id);
});


bot.command("add", async(ctx) => {
    const id = ctx.chat.id;
    userAddingStage++;
    userAddingID.push(id);
    await ctx.reply("Введите название песни:");
});

function contains(data:number[], value:number)
{
    for (let i=0; i < data.length; i++)
    {
        if(data[i] == value)
        {
            return true;
        }
    }
    return false;
}
bot.on("message", async (ctx) => {

    const id = ctx.chat.id;
    if(contains(userAddingID, id))
    {
        if(userAddingStage == 1)
        {
            userAddingSongData[0] = ctx.message.text;
            await ctx.reply("Введите текст песни:");
            userAddingStage++;
        }
        else if(userAddingStage == 2)
        {
            userAddingSongData[1] = ctx.message.text;
            userAddingStage = 0;
            userAddingID[userAddingID.indexOf(id)] = -1;
            songs.appendSong(userAddingSongData[0], userAddingSongData[1], "nullptr");

            const keys: string[] = [ "Назад" ];

            const buttonRows = keys
                .map((label) => [Keyboard.text(label)]);
            const keyboard = Keyboard.from(buttonRows).resized();

            keyboard.one_time_keyboard = true;

            await ctx.reply("Спасибо, ваша песня записана в базу!", {reply_markup: keyboard});
        }
    }
    else
    {
        const listOfSongs = songs.getListNamesSongs();

        if(listOfSongs.includes(ctx.message.text))
        {
            const keys: string[] = [ "Назад" ];

            const buttonRows = keys
                .map((label) => [Keyboard.text(label)]);
            const keyboard = Keyboard.from(buttonRows).resized();

            keyboard.one_time_keyboard = true;

            let songText = "Текст песни " + ctx.message.text + ":\n\n";

            songText += songs.getTextOfSong(ctx.message.text);

            await bot.api.sendMessage(id, songText, {reply_markup: keyboard});
        }
        else if(ctx.message.text == "Назад")
        {
            await showSongsList(id);
        }
        else
        {
            await bot.api.sendMessage(id, "Такой песни я пока не знаю(\nОбратитесь к @andy_god - он поможет");
        }
    }
});

// 3. Start the bot
bot.start()