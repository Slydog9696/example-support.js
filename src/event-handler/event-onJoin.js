const { Events, EmbedBuilder } = require('discord.js');

process.on("unhandledRejection", (err) => console.error(err));

module.exports = {
  name: Events.ClientReady,

  execute(client) {
    client.on('guildMemberAdd', async (member) => {
      console.log(member.user.id)

      const channel = await client.channels.fetch('WELCOME_CHANNEL');
      const unixTime = Math.floor(Date.now() / 1000);

      const embed = new EmbedBuilder()
        .setDescription(`You found us!\nWe hope you have fun here.\n<t:${unixTime}:f>\n\n[\`🍻\`](https://www.youtube.com/watch?v=DzLdFmPncms "Member #${member.guild.memberCount}") ||${member.user}||`)
        .setFooter({ text: 'Tip: Read the rules. If you need help, contact support.' })
        .setThumbnail('https://i.imgur.com/9JQwDxz.png')
        .setColor('#2ecc71')

      await channel.send({ content: `${member.user}`, embeds: [embed] })
    },
    )
  }
};


