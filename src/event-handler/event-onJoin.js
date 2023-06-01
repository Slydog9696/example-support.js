const { Events, EmbedBuilder } = require('discord.js');

process.on("unhandledRejection", (err) => console.error(err));

module.exports = {
  name: Events.ClientReady,

  execute(client) {
    client.on('guildMemberAdd', async (member) => {
      console.log(member.user.id)

      const channel = await client.channels.fetch('1049521298528796676');
      const unixTime = Math.floor(Date.now() / 1000);

      const embed = new EmbedBuilder()
        .setDescription(`Welcome to Lego My Stego!\nRebuilt, from the ground up.\n<t:${unixTime}:f>\n\n[\`🍻\`](https://www.youtube.com/watch?v=dQw4w9WgXcQ "Member #${member.guild.memberCount}") ||${member.user}||`)
        .setFooter({ text: 'Tip: Contact support if there are issues.' })
        .setThumbnail('https://i.imgur.com/z6J81xQ.png')
        .setColor('#2ecc71')

      await channel.send({ content: `${member.user}`, embeds: [embed] })
    },
    )
  }
};


