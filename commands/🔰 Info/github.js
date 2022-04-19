const {
	MessageEmbed, MessageButton, MessageActionRow
} = require("discord.js")
const config = require(`../../botconfig/config.json`)
var ee = require(`../../botconfig/embed.json`)
const emoji = require(`../../botconfig/emojis.json`);
const { handlemsg } = require(`../../handlers/functions`)
module.exports = {
	name: "ownergithub",
	category: "🔰 Info",
	aliases: ["ownergit", "source", "sourcecode", "src"],
	cooldown: 2,
	usage: "ownergithub",
	description: "Shows you the Github and Source Code Information about this Bot",
	type: "bot",
	run: async (client, message, args, cmduser, text, prefix, player, es, ls, GuildSettings) => {
		
		let button_public_invite = new MessageButton().setStyle('LINK').setLabel('Invite me').setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`)
		let button_support_dc = new MessageButton().setStyle('LINK').setLabel('Support Server').setURL("https://dsc.gg/devraiden")//array of all buttons
		let button_dash = new MessageButton().setStyle('LINK').setLabel('Website Design').setURL("https://wartegdesign.my.id")//array of all buttons
		const allbuttons = [new MessageActionRow().addComponents([button_public_invite, button_support_dc, button_dash])]
		message.reply({embeds: [new MessageEmbed()
			.setColor(es.color)
			.setFooter(client.getFooter(es))
			.setTimestamp()
			.setThumbnail("https://cdn.discordapp.com/avatars/965463402816348230/da286d4d838047345de3a48d9ff3902c.webp")
			.setTitle(client.la[ls].cmds.info.github?.title)
			.setURL("https://dsc.gg/devraiden")
			.addField("GITHUB", `> There is now an Version of this Bot on [\`Keyy\`'s Github](https://github.com/keyyskuy)`)
			.setDescription(client.la[ls].cmds.info.github?.description)],
			components: allbuttons
		}).catch(error => console.log(error));
	}
}

