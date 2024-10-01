import { PlayerDTO, PlayerControllerApi } from '@/lib/generated';
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const playerApi = new PlayerControllerApi(undefined, BASE_URL);

export const checkServerStatus = async (): Promise<boolean> => {
  //TODO: create ad hoc endpoint?
  try {
    const response = await playerApi.search();
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
