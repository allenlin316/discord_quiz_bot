const { Client, Intents, MessageEmbed } = require('discord.js');
const myIntents = new Intents([
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS
]);

const client = new Client({ intents: myIntents });

const auth = require('./auth.json');
const quiz = require('./question.json');
const dquiz = require('./QuizMenu.js');
const prefix = '!';
let gameMode = 0;

console.clear();

client.login(process.env.token);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', msg => {
    if (msg.member.user.bot || !msg.content.startsWith(prefix)) return; //prevent robot from answering
    if (gameMode == 0) dquiz.init();
    if (msg.content.toLowerCase() == '!hello') {

        const Embed = new MessageEmbed()
            .setTitle('使用方法')
            .setColor('PURPLE')
            .setThumbnail('https://i.imgur.com/Hl499XV.jpg')
            .setDescription(`嗨囉 ${msg.author.username}!`)
            .addFields(
                { name: '!hello', value: '顯示這個視窗', inline: true },
                { name: '!quiz', value: '開始做題目\n題目做完後會自動重複', inline: true },
            )
        msg.channel.send({ embeds: [Embed] });
    }
    if (msg.content.toLowerCase() == '!quiz') {
        dquiz.setQuestion();
        dquiz.interface(msg);
        gameMode = 1;
    }
    if (dquiz.checkIsFinished()) {
        msg.channel.send("這是最後一題了\n沒有題目了!\n接下來會重複");
        gameMode = 0;
    }

});