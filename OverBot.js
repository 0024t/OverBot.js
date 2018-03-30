const Discord = require("discord.js");
let fs = require("fs");
var request = require("request");
var owjs = require("overwatch-js");
var pseudo;
const bot = new Discord.Client()
var KDA = 0;

bot.login(process.argv[2]) //token du bot

bot.on("ready", function () {
  console.log("Connected")
})

bot.on("message", message => {
  console.log(message.guild + "  :  " + message.author.username + ": " + message); //affiche la guilde suivie de l'auteur et du message dans les logs

  if (message.content.startsWith("OwStat")) { 
    pseudo = message.content.split(" ", 2);
    message.delete
    owjs //fonction pour récuperer les données
      .getAll('pc', 'eu', pseudo[1].split("#").join("-"))
      .then((data) => message.channel.send({
        embed: {
          color: message.member.highestRole.color,
          author: {
            name: data.profile.nick + "\'s profile",
            url: data.profile.url,
          },
          footer: {
            icon_url: bot.avatar,
            text: "© Edorion"
          },
          thumbnail: {
            url: data.profile.avatar
          },
          fields: [{
              name: "Level :",
              value: data.profile.level
            },
            {
              name: "Tier :",
              value: data.profile.tier
            },
            {
              name: "Deaths (Total) :",
              value: addition(IsNull(data.competitive.global.deaths), data.quickplay.global.deaths),
              inline: true
            },
            {
              name: "Eliminations (Total) :",
              value: addition(IsNull(data.competitive.global.eliminations), data.quickplay.global.eliminations),
              inline: true
            },
            {
              name: "Games won (Total) :",
              value: addition(IsNull(data.competitive.global.games_won), data.quickplay.global.games_won),
            },
            {
              name: "Best killstreak (Competitive) :",
              value: IsNull(data.competitive.global.kill_streak_best),
              inline: true
            },
            {
              name: "Best killstreak (Quickplay) :",
              value: data.quickplay.global.kill_streak_best,
              inline: true
            },
            {
              name: "Kill by life",
              value: retournerunstring(division(addition(IsNull(data.competitive.global.eliminations), data.quickplay.global.eliminations), addition(IsNull(data.competitive.global.deaths), data.quickplay.global.deaths)))
            }
          ],
          timestamp: new Date(),
        }
      }))
  }

  if (message.content.startsWith("OverBot shutdown")) { //éteint le bot
    message.channel.sendMessage("Disconnected")
    bot.user.exit;
    process.exit(0)
  }
});

function addition(Value1, Value2) { //Addition
  result = Value1 + Value2
  return result
}

function IsNull(Data) { //vérifie la valeur d'une variable. Si elle est nulle, retourne un Nombre 0
    if (typeof Data != "undefined") {
      return Data
    } else {
      return 0
    }
}

function division(Value1, Value2) { //Fait une division avec moins de texte ^^
  result = Value1 / Value2
  return result;
}

function retournerunstring(Value) { //Retourne un String à partir d'un nombre
  KDA = Value;
  KDA = KDA.toFixed(2);
  return KDA.toString();
}