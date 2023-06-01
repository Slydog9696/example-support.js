const { ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder } = require('discord.js');

process.on("unhandledRejection", (err) => console.error(err));

module.exports = {
  name: Events.ClientReady,

  execute(client) {
    client.on(Events.InteractionCreate, async interaction => {

      if (interaction.customId === 'verified-stego-baby') {
        await interaction.deferReply({ ephemeral: true });

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

      if (interaction.customId === 'suggest-here') {

        const modal = new ModalBuilder()
          .setCustomId('suggest-modal')
          .setTitle('Suggestion Title');

        const suggestionInput = new TextInputBuilder()
          .setCustomId('suggestion')
          .setLabel('Player Suggestion')
          .setPlaceholder('Lorem ipsum dolor sit amet.')
          .setMaxLength(300)
          .setMinLength(5)
          .setStyle(TextInputStyle.Paragraph);

        const firstActionRow = new ActionRowBuilder().addComponents(suggestionInput);
        modal.addComponents(firstActionRow);
        await interaction.showModal(modal);
      }

      if (interaction.customId === 'suggest-modal') {
        const channel = await interaction.client.channels.fetch('1113707625289355284');

        const embed = new EmbedBuilder()
          .setDescription(`> ${interaction.fields.getTextInputValue('suggestion')}\n\n||<@${interaction.user.id}>||\n`)
          .setFooter({ text: 'Tip: Contact support if there are issues.' })
          .setColor('#2ecc71')

        const message = await channel.send({ content: '<@&1113856248748720218>', embeds: [embed] })
        await message.react('1113583272073633852')
        await message.react('1113860645348188271')
        await message.react('1113860673806532738')

        await message.startThread({
          name: 'Suggestion information',
        });

        await interaction.reply({ content: 'Your submission was received successfully!', ephemeral: true });
      }
    });
  },
};