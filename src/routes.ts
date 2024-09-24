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
  SETTINGS: {
    pathname: '/settings',
  },
};
