const {Command} = require("./Command");
const {MessageSender} = require("../MessageSender");

class SayCommand extends Command {

    static command = "!kshsay";

    static cooldownMs = 10000;
    static cooldownIds = [];

    static description = "Quotes something someone said | __<text>__"

    static async call(args, msgId, sender, token, channel_id) {

        if (args.length < 2) {
            await MessageSender.reply(msgId, "**Invalid arguments!**", token, channel_id);
            return false;
        }

        var msg = "";
        for (var i = 1; i <= args.length - 1; i++) {
            msg += args[i];
            if (i != args.length - 1) {
                msg += " ";
            }
        }

        await MessageSender.send(`"${msg}" **~ ${sender.username}#${sender.discriminator}**`, token, channel_id);

        return true;

    }


}

module.exports = {SayCommand};
