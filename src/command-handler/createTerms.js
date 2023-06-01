const { SlashCommandBuilder, EmbedBuilder, ChannelType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

process.on('unhandledRejection', (err) => console.error(err));

module.exports = {
  data: new SlashCommandBuilder()
    .setName('create-terms')
    .setDescription('Creates a ToS channel, reactions assigned.'),

  async execute(interaction) {

    const termsChannel = await interaction.guild.channels.create({
      type: ChannelType.GuildText,
      name: '📌│𝗧erms-𝗢f-𝗦ervice',
    });

    const embed = new EmbedBuilder()
      .setDescription("**Terms of Service**\nWhen joining the server, you're required to follow all rules outlined and listed below. There is a zero-tolerance policy for the vast majority, please read carefully. If you refuse to follow them, do so at your own risk. \n\n**`📄` | Discord Common Sense Rules**\n`#:` Abusing game exploits is not allowed.\n`#:` Threatening players is not allowed.\n`#:` Impersonating staff is not allowed.\n`#:` Spamming content is not allowed.\n`#:` Racism or sexism is not allowed.\n\n**`📄` | Discord Specific Rules**\n`#:` Do not message admins, make a ticket.\n`#:` Do not advertise, request a promotion.\n`#:` Do not speak on inappropriate topics.\n\n`🍻` ||https://discord.com/terms||")
      .setFooter({ text: 'Tip: Contact support if there are issues.' })
      .setColor('#2ecc71')

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('verified-stego-baby')
          .setLabel('Verified Stego Baby')
          .setEmoji('1113583272073633852')
          .setStyle(ButtonStyle.Success),
      );

    await termsChannel.send({ embeds: [embed], components: [row] })
  }
};


