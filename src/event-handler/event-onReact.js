const { Events } = require('discord.js');

process.on("unhandledRejection", (err) => console.error(err));

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    client.on(Events.InteractionCreate, async interaction => {

      if (!interaction.isButton()) return;
      await interaction.deferReply({ ephemeral: true });

      if (interaction.customId === 'verified-stego-baby') {

        const giveRole = async () => {
          await interaction.member.roles.add(verifiedRole)
          console.log('Role Given')
        }

        const removeRole = async () => {
          await interaction.member.roles.add(verifiedRole)
          console.log('Role Taken')
        }

        const verifiedRole = '1049521297174040689';
        interaction.member.roles.cache.has(verifiedRole)
          ? giveRole() : removeRole()
      }

    });
  },
};
