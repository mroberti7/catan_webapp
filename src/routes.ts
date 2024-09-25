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
  STATISTICS: {
    pathname: '/statistics',
  },
  SETTINGS: {
    pathname: '/settings',
  },
};
