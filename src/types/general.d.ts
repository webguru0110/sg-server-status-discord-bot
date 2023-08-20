type ServerAddress = {
  host: string,
  port: number,
};

type Player = {
  name?: string;
};

type ServerInfo = {
  name: string,
  map: string,
  players: Player[],
  raw?: {
    game?: string,
  },
};
