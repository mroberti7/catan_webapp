import { Player } from '@/app/utils/types';
import axios from 'axios';
const BASE_URL = 'https://66f4231b77b5e88970987951.mockapi.io';

//TODO: create wrapper to handle errors

export const getPlayers = async (): Promise<Player[] | undefined> => {
  try {
    const response = await axios.get(`${BASE_URL}/player`);
    return response.data as Player[];
  } catch (e) {
    console.error(e);
  }
};
