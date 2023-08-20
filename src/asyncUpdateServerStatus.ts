import { APIEmbed } from 'discord-api-types/v10';
import { Message, TextBasedChannel } from 'discord.js';

import { MessageModelType } from './database/Message/_model';
import deleteMessage from './database/Message/delete';
import fetchServerInfo from './serverInfo/fetch';
import generateEmbed from './utils/generateEmbed';
import generateErrorEmbed from './utils/generateErrorEmbed';

// 1 minute
const timePeriod = 1 * 1000 * 60;

const asyncUpdateServerStatus = async (
  info: MessageModelType,
  channel: TextBasedChannel,
  replyMessage?: Message<boolean>,
): Promise<void> => {
  let message: Message<boolean> | null = replyMessage || null;

  if (message === null) {
    try {
      message = await channel.messages.fetch(info.messageId);
    } catch {
      await deleteMessage(info);
      console.log(`INFO: Message ${info.messageId} in channel ${info.channelId} not found`);
    }
  }

  if (!message) return;

  console.log(`INFO: Adding message ${info.messageId} in channel ${info.channelId} to update cycle`);

  let intervalId: NodeJS.Timer | null = null;
  let lastUpdate = info.timestamp;

  const updateServerInfo = async () => {
    let serverInfo: ServerInfo | null = null;
    let embed: APIEmbed | null = null;

    try {
      serverInfo = await fetchServerInfo({ host: info.serverHost, port: info.serverPort });
    } catch {
      embed = generateErrorEmbed({ host: info.serverHost, port: info.serverPort });
    }

    if (!serverInfo) {
      return;
    }

    embed = generateEmbed(
      serverInfo.name,
      serverInfo.map,
      serverInfo.raw?.game || 'unknown',
      String(serverInfo.players.length),
    );

    try {
      await message?.edit({ embeds: [embed] });
    } catch {
      await deleteMessage(info);
      console.log(`INFO: Message ${info.messageId} in channel ${info.channelId} not found`);

      if (intervalId) clearInterval(intervalId);
    }

    lastUpdate = Date.now();
  };

  if (Date.now() - lastUpdate > timePeriod) updateServerInfo();

  intervalId = setInterval(updateServerInfo, timePeriod);
};

export default asyncUpdateServerStatus;
