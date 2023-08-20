import { APIEmbed } from 'discord-api-types/v10';

const generateEmbed = (
  serverName: string,
  map: string,
  missionName: string,
  playersCount: string,
): APIEmbed => ({
  title: serverName,
  color: 0o0,
  timestamp: new Date().toISOString(),
  thumbnail: {
    url: 'https://cdn.discordapp.com/icons/701475661948125244/5ebfd97604e5d81775204183e260f297.webp',
  },
  fields: [
    {
      name: 'Карта',
      value: map,
      inline: true,
    },
    {
      name: 'Миссия',
      value: missionName,
      inline: true,
    },
    {
      name: 'Кол-во игроков',
      value: playersCount,
    },
  ],
});

export default generateEmbed;
