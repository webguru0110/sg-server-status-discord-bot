import { SlashCommandBuilder } from '@discordjs/builders';
import { Message } from 'discord.js';

import asyncUpdateServerStatus from '../asyncUpdateServerStatus';
import MessageModel from '../database/Message/_model';
import fetchServerInfo from '../serverInfo/fetch';
import parseAddress from '../serverInfo/parseAddress';
import generateEmbed from '../utils/generateEmbed';
import generateErrorMessage, { errorPrefix } from '../utils/generateError';
import { Command } from './_types';

const showStatus: Command = {
  data: new SlashCommandBuilder()
    .setName('show_status')
    .setDescription('Send message with server status')
    .addStringOption((option) => (
      option
        .setName('server_address')
        .setDescription('Address should look like this: xx.xx.xxx.xxx:port')
        .setRequired(true)
    )),
  run: async (interaction) => {
    await interaction.deferReply();

    const message = await interaction.fetchReply();

    let address: ServerAddress | null = null;

    try {
      address = parseAddress(interaction.options.getString('server_address', true));
    } catch (err) {
      if (err instanceof Error && err.message.includes(errorPrefix)) {
        await interaction.editReply(`${err.message}`);
      }
    }

    if (!address) {
      return;
    }

    let serverInfo: ServerInfo | null = null;

    try {
      serverInfo = await fetchServerInfo(address);
    } catch {
      await interaction.editReply(generateErrorMessage('server not found'));
    }

    if (!serverInfo) {
      return;
    }

    const embed = generateEmbed(
      serverInfo.name,
      serverInfo.map,
      serverInfo.raw?.game || 'unknown',
      String(serverInfo.players.length),
    );

    await interaction.editReply({ embeds: [embed] });

    const modelData = await MessageModel.create({
      channelId: interaction.channelId,
      messageId: message.id,
      serverHost: address.host,
      serverPort: address.port,
      timestamp: Date.now(),
    });

    if (!interaction.channel) return;

    asyncUpdateServerStatus(modelData, interaction.channel, message as Message<boolean>);
  },
};

export default showStatus;
