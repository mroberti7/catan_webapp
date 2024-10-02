import { PlayerDTO, PlayerControllerApi, GameControllerApi, ServerStatusApi, PlayerScoreDTO, GameDTO } from '@/lib/generated';
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const playerApi = new PlayerControllerApi(undefined, BASE_URL);
const serverStatusApi = new ServerStatusApi(undefined, BASE_URL);
const gameApi = new GameControllerApi(undefined, BASE_URL);

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
    const response = await playerApi.search();
    console.log('Player data:', response);
    return response?.data?.content || [];
  } catch (error) {
    console.error('Error fetching player data:', error);
    return [];
  }
};

export const getAllGames = async (): Promise<GameDTO[]> => {
  try {
    const response = await gameApi.search1();
    return response?.data?.content || [];
  } catch (error) {
    console.error('Error fetching game data:', error);
    return [];
  }
};

export const getGameById = async (id: number): Promise<PlayerScoreDTO[] | null> => {
  try {
    const response = await gameApi.getGameRanking(id);
    return response?.data;
  } catch (error) {
    console.error('Error fetching game data:', error);
    return null;
  }
};

export const createGame = async (gameData: PlayerScoreDTO[]): Promise<number> => {
  // TODO: mi deve tornare qualche info del gioco creato, almeno l'id in modo da
  // TODO: fare redirect su games/[id] per poter effettivamente giocare
  try {
    const response = await gameApi.createNewGame(gameData);
    return response?.data;
  } catch (error) {
    console.error('Error creating game:', error);
    return -1;
  }
};
