import { Client } from 'discord.js';

import asyncUpdateServerStatus from './asyncUpdateServerStatus';
import getAllMessages from './database/Message/getAll';
import connectToDatabase from './database/connect';
import onInteraction from './onInteraction';

(async () => {
  await connectToDatabase();
  const bot = new Client({ intents: [] });

  bot.once('ready', () => console.log('INFO: Bot is ready'));

  await bot.login(process.env.TOKEN);

  bot.on('interactionCreate', onInteraction);

  const messages = await getAllMessages();

  messages.forEach(async (message) => {
    const channel = await bot.channels.fetch(message.channelId);

    if (channel && channel.isText()) asyncUpdateServerStatus(message, channel);
  });
})();
