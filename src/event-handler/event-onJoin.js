const { Events, EmbedBuilder } = require('discord.js');

process.on("unhandledRejection", (err) => console.error(err));

module.exports = {
  name: Events.ClientReady,

  execute(client) {
    client.on('guildMemberAdd', async (member) => {
      console.log(member.user.id)

      console.log(member)

      const channel = await client.channels.fetch('1049521298528796676');
      await channel.send({ content: member.user.id })
    },
    )
  }
};


