const { MessageEmbed } = require('discord.js');
const quiz = require('./question.json');

let question;
let indexOfQuestion;
let tmpQuiz = []

exports.init = function() {
    for(let i=0; i<quiz.length; i++){
        tmpQuiz[i] = quiz[i];
    }
}

exports.setQuestion = function() {
    indexOfQuestion = Math.floor(Math.random()*tmpQuiz.length);
    question = tmpQuiz[indexOfQuestion];
    tmpQuiz.splice(indexOfQuestion,1);
}

exports.checkIsFinished = function() {
    if(tmpQuiz.length > 0)
        return false;
    return true;
}

exports.interface = function(message) {
    const Embed = new MessageEmbed()
    .setColor('YELLOW')
    .setTitle('QUIZ TIME')
    .setDescription(
        `${question.question}
        
        A)  ${question.choices[0]}
        B)  ${question.choices[1]}
        C)  ${question.choices[2]}`
    )
    message.channel.send(
        { embeds: [Embed] }
    ).then (async msg => {

        await msg.react('🇦');
        await msg.react('🇧');
        await msg.react('🇨');
        //await msg.react('🇩');
        const filter = (reaction, user) => {
            //console.log(reaction.emoji.name);
            return ['🇦', '🇧', '🇨'].includes(reaction.emoji.name) && !user.bot
        };

        msg.awaitReactions({filter, max:1})
            .then(collected => {
                var reaction = collected.first().emoji.name;
                
                if(reaction == question.answer){
                    const embed = new MessageEmbed()
                        .setColor('GREEN')
                        .setDescription('Nice Job dude')
                    msg.channel.send({ embeds: [embed] });
                    //msg.channel.send('Correct');
                }
                else{
                    const embed = new MessageEmbed()
                        .setColor('RED')
                        .setDescription(`NO man!\nThe answer is ${question.answer}`)
                    msg.channel.send({ embeds: [embed] });
                }
            })
            .catch(collected => {
                console.log('Something went wrong!', collected.size());
            })
    });
}

