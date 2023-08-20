import gamedig from 'gamedig';

const fetchServerInfo = async ({ host, port }: ServerAddress): Promise<ServerInfo> => (
  gamedig.query({
    type: 'arma3',
    host,
    port,
  })
);

export default fetchServerInfo;
