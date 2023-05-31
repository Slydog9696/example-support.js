const { Events } = require('discord.js');

process.on("unhandledRejection", (err) => console.error(err));

module.exports = {
  name: Events.ClientReady,

  execute(client) {
    client.on('guildMemberAdd', (member) => {
      console.log(member)
    },
    )
  }
};


//! Bot creates ToS message.
//! Bot create ToS button.

//? If user clicks, toggle role. 