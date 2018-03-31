const Discord = require("discord.js");
let fs = require("fs");
var request = require("request");
var owjs = require("overwatch-js");
var pseudo;
const bot = new Discord.Client()
var KDA = 0;

bot.login(process.argv[2]) //get the bot token

bot.on("ready", function () {
  console.log("Connected")
  bot.user.setPresence("online")
})

bot.on("message", message => {
  console.log(message.guild + "  :  " + message.author.username + ": " + message); //Write server's messages on the console log

  if (message.content.startsWith("OwStat")) { 
    pseudo = message.content.split(" ", 2);
    message.delete
    owjs //Main function
      .getAll('pc', 'eu', pseudo[1].split("#").join("-"))
      .then((data) => message.channel.send({
        embed: {
          color: message.member.highestRole.color,
          author: {
            name: data.profile.nick + "\'s profile",
            url: data.profile.url,
          },
          footer: {
            icon_url: bot.user.avatarURL,
            text: "OverBot.js V0.6.0, © Edorion"
          },
          thumbnail: {
            url: data.profile.avatar
          },
          fields: [{
              name: "Global informations :",
              value: "Level : " + data.profile.level + "\nTier : " + data.profile.tier + "\nRank  :  " + data.profile.rank
            },
            {
              name: "Stats (Quickplay) :  ",
              value: "Death  :  " + data.quickplay.global.deaths + "\nEliminations  :  " + data.quickplay.global.eliminations + "\nGames won  :  " + data.quickplay.global.games_won +"\n ",
              inline: true
            },
            {
              name: "Stats (Actual competitive season) :  ",
              value: "Death  :  " + IsNull(data.competitive.global.deaths) + "\nEliminations  :  " + IsNull(data.competitive.global.eliminations) + "\nGames won  :  " + data.competitive.global.games_won + "\n ",
              inline: true
            },
            {
              name: "Random stats :",
              value: "Best killstreak (Actual competitive season)  :  " + IsNull(data.competitive.global.kill_streak_best) + "\nBest killstreak (Quickplay)  :  " + data.quickplay.global.kill_streak_best + "\nGlobal Kill by life ratio  :  " + retournerunstring(division(addition(IsNull(data.competitive.global.eliminations), data.quickplay.global.eliminations), addition(IsNull(data.competitive.global.deaths), data.quickplay.global.deaths))) + "\n " ,
            }
          ],
          timestamp: new Date(),
        }
      }))
  }

  if (message.content.startsWith("OverBot shutdown")) { //Shutdown the bot
    message.channel.sendMessage("Disconnected")
    bot.user.exit;
    setTimeout(function() {
      process.exit(0)
    }, 3000);
  }
});

function addition(Value1, Value2) { //Addition
  result = Value1 + Value2
  return result
}

function IsNull(Data) { //Check the value of a variable
    if (typeof Data != "undefined") {
      return Data
    } else {
      return 0
    }
}

function division(Value1, Value2) { //Division
  result = Value1 / Value2
  return result;
}

function retournerunstring(Value) { //Return string from a number
  number = Value;
  number = number.toFixed(2);
  return number.toString();
}