const {Command} = require("./Command");
const {MessageSender} = require("../MessageSender");
const {fetch} = require("undici");

class FoodCommand extends Command {

    static command = "food";

    static cooldownMs = 5000;
    static cooldowns = [];

    static description = "Shows a random food picture :drool: `[chinese|greek|indian|italian|japanese|mexican]`";

    static subredditKey = {
        "chinese": "chinesefood",
        "greek": "greekfood", 
        "indian": "indianfoodphotos", 
        "italian": "italianfood", 
        "japanese": "japanesefood",
        "mexican": "mexicanfood"
    }

    static call(args, data, token) {

        if (args[0] == undefined) {

            var subreddits = [
                "chinese",
                "food",
                "foods",
                "greekfood", 
                "indianfoodphotos", 
                "italianfood", 
                "japanesefood",
                "mexicanfood"
            ]
    
            var rng = Math.round(Math.random() * (subreddits.length - 1));

            this.getRandomRedditPostJSON(subreddits[rng])

                .then(json => {

                    var {title, url, subreddit} = json;
                    MessageSender.reply(data.id, `**${title} (from r/${subreddit})**\n${url}`, token, data.channel_id);

                })

        }

        else {

            var foodSubreddit = args[0].toLowerCase();

            this.getRandomRedditPostJSON(this.subredditKey[foodSubreddit])

                .then(json => {

                    var {title, url, subreddit} = json;
                    MessageSender.reply(data.id, `**${title} (from r/${subreddit})**\n${url}`, token, data.channel_id);

                })

        }

    }


}

module.exports = {FoodCommand};
