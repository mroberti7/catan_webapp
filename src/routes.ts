export type Routes = {
  [k: string]: {
    pathname: string;
  };
};

export const ROUTES: Routes = {
  HOME: {
    pathname: '/',
  },
  PLAYERS: {
    pathname: '/players',
  },
  GAME: {
    pathname: '/game',
  },
  GAMES: {
    pathname: '/games',
  },
  STATISTICS: {
    pathname: '/statistics',
  },
  SETTINGS: {
    pathname: '/settings',
  },
};
