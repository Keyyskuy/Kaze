const {
  MessageEmbed, MessageActionRow
} = require("discord.js");
const config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const { MessageButton } = require('discord.js')
const dash = `\n❯ Kaze | powered by Keyy`
module.exports = {
  name: "support",
  category: "🔰 Info",
  usage: "invite",
  description: "Sends you the Support Server Link",
  type: "bot",
  run: async (client, message, args, cmduser, text, prefix, player, es, ls, GuildSettings) => {
    
    
    try {
      //
      let button_public_invite = new MessageButton().setStyle('LINK').setLabel('Invite me').setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`)
      let button_support_dc = new MessageButton().setStyle('LINK').setLabel('Support Server').setURL("https://dsc.gg/devraiden")//array of all buttons
      let button_dash = new MessageButton().setStyle('LINK').setLabel('Website Design').setURL("https://wartegdesign.my.id")//array of all buttons
      const allbuttons = [new MessageActionRow().addComponents([button_public_invite, button_support_dc, button_dash])]
      message.reply({
        embeds: [new MessageEmbed()
          .setColor(ee.color)
          .setTitle(client.la[ls].cmds.info.support.title)
          .setDescription(`  •  [Support Discord](https://discord.gg/isei)\n • [Website Design](https://wartegdesign.my.id)\n • [Development](https://dsc.gg/devraiden)\n • [Invite](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands)`)
          .setFooter(client.getFooter(''+dash, 'https://cdn.discordapp.com/attachments/935096019555844128/965675076357853234/ezgif.com-gif-maker_1.gif'))
          .setURL("https://discord.com/api/oauth2/authorize?client_id=965463402816348230&permissions=8&scope=bot%20applications.commands")],
        components: allbuttons
      });
    } catch (e) {
      console.log(String(e.stack).grey.bgRed)
      return message.reply({embeds: [new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(client.getFooter(es))
        .setTitle(client.la[ls].common.erroroccur)
        .setDescription(eval(client.la[ls]["cmds"]["info"]["color"]["variable2"]))
      ]});
    }
  }
}

