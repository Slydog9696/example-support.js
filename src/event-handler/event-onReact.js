const { Events, EmbedBuilder } = require('discord.js');

process.on("unhandledRejection", (err) => console.error(err));

module.exports = {
  name: Events.ClientReady,

  execute(client) {
    client.on(Events.InteractionCreate, async interaction => {

      if (!interaction.isButton()) return;
      await interaction.deferReply({ ephemeral: true });

      if (interaction.customId === 'verified-stego-baby') {

        const giveRole = async () => {
          const embed = new EmbedBuilder()
            .setDescription(`Discord Role: <@&${verifiedRole}>\nHas been added, successfully.`)
            .setFooter({ text: 'Tip: Contact support if there are issues.' })
            .setColor('#2ecc71')

          console.log('Role Given')
          await interaction.member.roles.add(verifiedRole)
          await interaction.followUp({ embeds: [embed], ephemeral: true })
        }

        const removeRole = async () => {
          const embed = new EmbedBuilder()
            .setDescription(`Discord Role: <@&${verifiedRole}>\nHas been removed, successfully.`)
            .setFooter({ text: 'Tip: Contact support if there are issues.' })
            .setColor('#2ecc71')

          console.log('Role Removed')
          await interaction.member.roles.remove(verifiedRole)
          await interaction.followUp({ embeds: [embed], ephemeral: true })
        }

        const verifiedRole = '1049521297174040689';
        interaction.member.roles.cache.has(verifiedRole)
          ? removeRole() : giveRole()
      }
    });
  },
};
