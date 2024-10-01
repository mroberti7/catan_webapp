import { PagePlayerDTO, PlayerControllerApi } from '@/lib/generated';
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const playerApi = new PlayerControllerApi(undefined, BASE_URL);

export const getPlayers = async (): Promise<PagePlayerDTO | null> => {
  try {
    const response = await playerApi.search();
    console.log('Player data:', response);
    return response?.data;
  } catch (error) {
    console.error('Error fetching player data:', error);
    return null;
  }
};
