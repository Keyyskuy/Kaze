const {
  MessageEmbed,
  MessageButton,
  MessageActionRow
} = require("discord.js");
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const { handlemsg } = require(`${process.cwd()}/handlers/functions`);
    module.exports = {
  name: `stop`,
  category: `🎶 Music`,
  aliases: [`leave`, "dc", "disconnect", "votestop", "voteleave", "votedis", "votedisconnect", "vstop", "vleave", "vdis", "vdisconnect"],
  description: `Stops current track and leaves the channel`,
  usage: `stop`,
  parameters: {
    "type": "music",
    "activeplayer": true,
    "check_dj": true,
    "previoussong": false
  },
  run: async (client, interaction, cmduser, es, ls, prefix, player, message, GuildSettings) => {
    
    //
    if(GuildSettings.MUSIC === false) {
      return interaction?.reply({ephemeral: true, embed : [new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(client.getFooter(es))
        .setTitle(client.la[ls].common.disabled.title)
        .setDescription(handlemsg(client.la[ls].common.disabled.description, {prefix: prefix}))
      ]});
    }
    try {
      //if there is no current track error
      if (!player) {
        if (message.guild.me.voice.channel) {
          message.guild.me.voice.disconnect()
          return interaction?.reply({ephemeral: true, embeds : [new MessageEmbed()
            .setDescription(eval(client.la[ls]["cmds"]["music"]["stop"]["variable1"]))
            .setColor(es.color)

          ]});
        } else {
          return interaction?.reply({ephemeral: true, embeds : [new MessageEmbed()
            .setColor(es.wrongcolor)
            .setDescription(eval(client.la[ls]["cmds"]["music"]["stop"]["variable2"]))
          ]});
        }
        return
      }

      if (player.queue && !player.queue.current) {
        if (message.guild.me.voice.channel) {
          try {
            client.channels.cache.get(player.textChannel).messages.fetch(player.get("currentmsg")).then(msg => {
              const row = new MessageActionRow()
              .addComponents([
                new MessageButton().setCustomId('1').setEmoji("<:skip_track:956774847852204102>").setLabel("Skip").setStyle('SECONDARY').setDisabled(true),
                new MessageButton().setCustomId('2').setEmoji("<:stop:956774843901173800>").setLabel("Stop").setStyle('SECONDARY').setDisabled(true), 
                new MessageButton().setCustomId('3').setEmoji('<:pause:956774841191645264>').setLabel("Pause").setStyle('SECONDARY').setDisabled(true),
                new MessageButton().setCustomId('4').setEmoji('<:autoplay_mode:956774841262948442>').setLabel("Autoplay").setStyle('SECONDARY').setDisabled(true)
              ]);
              msg.edit({
                content: `Song has ended!`, 
                embeds: [msg.embeds[0]],
                components: [row]
            }).catch(() => null)
            }).catch((e) => {
              console.log(e.stack ? String(e.stack).dim : String(e).dim)
            })
          } catch {}
          try {
            message.guild.me.voice.disconnect();
          } catch {}
          try {
            player.destroy();
          } catch {}
          return interaction?.reply({embeds : [new MessageEmbed()
            .setDescription(client.la[ls].cmds.music.skip.title)
            .setColor(es.color)
          ]});
        } else {
          return interaction?.reply({ephemeral: true, embeds : [new MessageEmbed()
            .setColor(es.wrongcolor)
            .setDescription(eval(client.la[ls]["cmds"]["music"]["stop"]["variable3"]))
          ]});
        }
        return
      }
      try {
        client.channels.cache.get(player.textChannel).messages.fetch(player.get("currentmsg")).then(msg => {
          const row = new MessageActionRow()
          .addComponents([
            new MessageButton().setCustomId('1').setEmoji("<:skip_track:956774847852204102>").setLabel("Skip").setStyle('SECONDARY').setDisabled(true),
            new MessageButton().setCustomId('2').setEmoji("<:stop:956774843901173800>").setLabel("Stop").setStyle('SECONDARY').setDisabled(true), 
            new MessageButton().setCustomId('3').setEmoji('<:pause:956774841191645264>').setLabel("Pause").setStyle('SECONDARY').setDisabled(true),
            new MessageButton().setCustomId('4').setEmoji('<:autoplay_mode:956774841262948442>').setLabel("Autoplay").setStyle('SECONDARY').setDisabled(true)
          ]);
          msg.edit({
            content: `Song has ended!`, 
            embeds: [msg.embeds[0]],
            components: [row]
        }).catch(() => null)
        }).catch((e) => {
          console.log(e.stack ? String(e.stack).dim : String(e).dim)
        })
      } catch {}
      //stop playing
      try {
        player.destroy();
      } catch {}
      //React with the emoji
      return interaction?.reply({embeds : [new MessageEmbed()
        .setDescription(client.la[ls].cmds.music.skip.title)
        .setColor(es.color)
      ]});
    } catch (e) {
      console.log(String(e.stack).dim.bgRed)
    }
  }
};

