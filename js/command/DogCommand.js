const {Command} = require("./Command");
const {MessageSender} = require("../MessageSender");
const {fetch} = require("undici");
const { ArgumentError } = require("./error/ArgumentError");

class DogCommand extends Command {

    static command = "dog";

    static cooldownMs = 5000;
    static cooldownIds = [];

    static description = "Shows a random dog photo :dog: | __<breed?>__";

    static async getDogJSON(breed) {

        var dogRes;

        if (breed == undefined) {
            dogRes = await fetch("https://dog.ceo/api/breeds/image/random");
        }

        else {
            dogRes = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
        }

        var dogJSON = await dogRes.json();

        return dogJSON;

    }

    static call(args, data, token) {

        var breed = "";
        for (var i = 0; i <= args.length - 1; i++) {
            breed += args[i];
        }

        this.getDogJSON(breed)

            .then(json => {

                var {message, status} = json;

                if (status == "success") {
                    MessageSender.reply(data.id, message, token, data.channel_id);
                }

                else {
                    MessageSender.reply(data.id, "**I don't recognize that dog breed!** :dog: :x:", token, data.channel_id);
                }

            })

    }


}

module.exports = {DogCommand};
