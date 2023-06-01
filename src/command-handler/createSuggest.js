const { SlashCommandBuilder, EmbedBuilder, ChannelType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

process.on('unhandledRejection', (err) => console.error(err));

module.exports = {
  data: new SlashCommandBuilder()
    .setName('create-suggestion')
    .setDescription('Creates a suggestion channel, reactions assigned.'),

  async execute(interaction) {

    const suggestionChannel = await interaction.guild.channels.create({
      type: ChannelType.GuildText,
      name: '📑│𝗦uggest-𝗛ere',
    });


    const embed = new EmbedBuilder()
      .setDescription("Consider leaving a suggestion.\nThread will be created, as well.\n\n||https://discord.com/terms||")
      .setFooter({ text: 'Tip: Contact support if there are issues.' })
      .setThumbnail('https://i.imgur.com/z6J81xQ.png')
      .setColor('#2ecc71')

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('suggest-here')
          .setLabel('Suggest Here')
          .setEmoji('1113583272073633852')
          .setStyle(ButtonStyle.Success),
      );

    await suggestionChannel.send({ embeds: [embed], components: [row] })
  }
};


