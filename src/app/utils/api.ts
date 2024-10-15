import {
  PlayerDTO,
  PlayerControllerApi,
  GameControllerApi,
  GameDTO,
  ServerStatusApi,
  GameSetupDTO,
  GameInfoDTO,
  TurnDTO,
  StatisticsControllerApi,
  PlayerStatisticsDTO,
  GamePlayerDTO,
} from '@/lib/generated';
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const playerApi = new PlayerControllerApi(undefined, BASE_URL);
const serverStatusApi = new ServerStatusApi(undefined, BASE_URL);
const gameApi = new GameControllerApi(undefined, BASE_URL);
const statisticsApi = new StatisticsControllerApi(undefined, BASE_URL);

export const checkServerStatus = async (): Promise<boolean> => {
  try {
    const response = await serverStatusApi.status();
    return response?.status === 200;
  } catch (error) {
    console.error('Error checking server status:', error);
    return false;
  }
};

export const getPlayers = async (): Promise<PlayerDTO[]> => {
  try {
    const response = await playerApi.search(undefined, undefined, false);
    return response?.data?.content || [];
  } catch (error) {
    console.error('Error fetching player data:', error);
    return [];
  }
};

export const createGame = async (gameData: GameSetupDTO): Promise<number> => {
  try {
    const response = await gameApi.createGame(gameData);
    return response?.data;
  } catch (error) {
    console.error('Error creating game:', error);
    return -1;
  }
};

export const endCurrentGame = async (gameId: number, playersData: GamePlayerDTO[]): Promise<boolean | null> => {
  try {
    const response = await gameApi.endGame(gameId, playersData);
    return response?.status === 201;
  } catch (error) {
    console.error('Error ending game:', error);
    return null;
  }
};

export const getGameById = async (id: number): Promise<GameDTO | null> => {
  try {
    const response = await gameApi.findGameById(id);
    return response?.data;
  } catch (error) {
    console.error('Error fetching game data:', error);
    return null;
  }
};

export const getAllGames = async (): Promise<GameInfoDTO[]> => {
  try {
    const response = await gameApi.searchGames();
    return response?.data?.content || [];
  } catch (error) {
    console.error('Error fetching game data:', error);
    return [];
  }
};

export const saveTurn = async (gameId: number, turn: TurnDTO): Promise<boolean | null> => {
  try {
    const response = await gameApi.newTurn(gameId, turn);
    return response?.status === 201;
  } catch (error) {
    console.error('Error saving turn:', error);
    return null;
  }
};

export const deleteLastTurn = async (gameId: number): Promise<boolean | null> => {
  try {
    const response = await gameApi.deleteLastTurn(gameId);
    console.log('response', response);
    return response?.status === 204;
  } catch (error) {
    console.error('Error deleting last turn:', error);
    return null;
  }
};

export const getGameDiceStats = async (gameId: number): Promise<PlayerStatisticsDTO[] | null> => {
  try {
    const response = await statisticsApi.getGameDiceDashboard(gameId);
    return response?.data;
  } catch (error) {
    console.error('Error fetching game dice stats:', error);
    return null;
  }
};
