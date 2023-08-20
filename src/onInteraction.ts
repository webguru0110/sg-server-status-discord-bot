import { Interaction } from 'discord.js';

import commandsList from './commands/_list';

const onInteraction = async (interaction: Interaction) => {
  if (!interaction.isCommand()) return;

  commandsList.forEach(async (command) => {
    if (command.data.name !== interaction.commandName) return;

    await command.run(interaction);
  });
};

export default onInteraction;
