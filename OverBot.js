/* 
Do not delete depencies !!
You can find the overwatch-js github here : https://github.com/gclem/overwatch-js/ 

OverBot.js V0.8.0, © Edorion
*/




const Discord = require("discord.js");
const fs = require("fs");
const request = require("request");
const owjs = require("overwatch-js");
var pseudo;
const bot = new Discord.Client()
var KDA = 0;
var token = fs.readFileSync('Token.txt', 'utf8');

bot.login(token)

bot.on("ready", function () {
  console.log("Connected")
  bot.user.setPresence("online")
})

bot.on("message", message => {

  if (message.content.startsWith("OwStat")) {
    console.log("OwStat detected.")
    pseudo = message.content.split(" ", 2);
    message.delete
    owjs //Main function
      .getAll('pc', 'eu', pseudo[1].split("#").join("-"))
      .then((data) => message.channel.send({
        embed: {
          color: 16738560,
          author: {
            name: data.profile.nick + "\'s profile",
            url: data.profile.url,
            icon_url: RankImage(data.profile.rank)
          },
          footer: {
            icon_url: bot.user.avatarURL,
            text: "OverBot.js V0.7.0b, © Edorion"
          },
          thumbnail: {
            url: data.profile.avatar
          },
          fields: [{
              name: "Global informations :",
              value: "Level : " + data.profile.level +
                "\nTier : " + data.profile.tier +
                "\nRank  :  " + IsNull(data.profile.ranking) + " (" + data.profile.rank + ")" +
                "\nMost played hero (Quickplay)  :  " + data.quickplay.global.masteringHeroe +
                "\nMost played hero (Competitive)  :  " + IsNull(data.competitive.global.masteringHeroe)
            },
            {
              name: "Stats (Quickplay) :  ",
              value: "Death  :  " + data.quickplay.global.deaths +
                "\nEliminations  :  " + data.quickplay.global.eliminations +
                "\nGames won  :  " + data.quickplay.global.games_won +
                "\n ",
              inline: true
            },
            {
              name: "Stats (Last competitive season) :  ",
              value: "Death  :  " + IsNull(data.competitive.global.deaths) +
                "\nEliminations  :  " + IsNull(data.competitive.global.eliminations) +
                "\nGames won  :  " + IsNull(data.competitive.global.games_won) +
                "\n ",
              inline: true
            },
            {
              name: "Medal (Quickplay)  :",
              value: "Total  :  " + data.quickplay.global.medals +
                "\nBronze  :  " + data.quickplay.global.medals_bronze +
                "\nSilver  :  " + data.quickplay.global.medals_silver +
                "\nGold  :  " + data.quickplay.global.medals_gold,
              inline: true
            },
            {
              name: "Medal (Last competitive season)  :",
              value: "Total  :  " + IsNull(data.competitive.global.medals) +
                "\nBronze  :  " + IsNull(data.competitive.global.medals_bronze) +
                "\nSilver  :  " + IsNull(data.competitive.global.medals_silver) +
                "\nGold  :  " + IsNull(data.competitive.global.medals_gold),
              inline: true
            },
            {
              name: "Random stats  :",
              value: "Best killstreak (Competitive)  :  " + IsNull(data.competitive.global.kill_streak_best) +
                "\nBest killstreak (Quickplay)  :  " + data.quickplay.global.kill_streak_best +
                "\nGlobal Kill by life ratio  :  " + ReturnAString(Division(Addition(IsNull(data.competitive.global.eliminations), data.quickplay.global.eliminations), Addition(IsNull(data.competitive.global.deaths), data.quickplay.global.deaths))) +
                "\nTime played  :  " + secondsToString(Addition(data.quickplay.global.time_played, data.competitive.global.time_played) / 1000),
              inline: true
            }
          ],
          timestamp: new Date(),
        }
      })).catch(error => message.channel.send("This player does not exist. Please try again.") && console.log("Error : player does not exist"))
    }

   if (message.content.startsWith("OverBot shutdown")) { //Shutdown the bot
    message.channel.send("Disconnected")
    bot.user.exit;
     setTimeout(function () {
       process.exit(0)
     }, 3000);
   }
});

function Addition(Value1, Value2) { //Addition
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

function Division(Value1, Value2) { //Division
  result = Value1 / Value2
  return result;
}

function ReturnAString(Value) { //Return string from a number
  number = Value;
  number = number.toFixed(2);
  return number.toString();
}

function RankImage(Rank = 0) {
  if (Rank <= 1499) {
    return "https://d1u1mce87gyfbn.cloudfront.net/game/rank-icons/season-2/rank-1.png"
  } else if (Rank >= 1500 & Rank <= 1999) {
    return "https://d1u1mce87gyfbn.cloudfront.net/game/rank-icons/season-2/rank-2.png"
  } else if (Rank >= 2000 & Rank <= 2499) {
    return "https://d1u1mce87gyfbn.cloudfront.net/game/rank-icons/season-2/rank-3.png"
  } else if (Rank >= 2500 & Rank <= 2999) {
    return "https://d1u1mce87gyfbn.cloudfront.net/game/rank-icons/season-2/rank-4.png"
  } else if (Rank >= 3000 & Rank <= 3499) {
    return "https://d1u1mce87gyfbn.cloudfront.net/game/rank-icons/season-2/rank-5.png"
  } else if (Rank >= 3500 & Rank <= 3999) {
    return "https://d1u1mce87gyfbn.cloudfront.net/game/rank-icons/season-2/rank-6.png"
  } else if (Rank >= 4000) {
    return "https://d1u1mce87gyfbn.cloudfront.net/game/rank-icons/season-2/rank-7.png"
  }
}

function secondsToString(seconds) {
  var numhours = Math.floor(seconds / 3600);
  return numhours + " hours"
}