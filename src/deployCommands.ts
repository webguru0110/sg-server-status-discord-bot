import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';
import dotenv from 'dotenv';

import commandsList from './commands/_list';

dotenv.config();

const commands = commandsList.map((command) => command.data.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

rest
  .put(Routes.applicationCommands(process.env.APPLICATION_ID), { body: commands })
  .then(() => console.log('Successfully registered application commands'))
  .catch(console.error);
