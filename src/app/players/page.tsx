'use client';
import ComposedLayout from '@/app/_components/layouts';
import Loader from '@/app/_components/loader/loader';
import { getPlayers } from '@/app/utils/api/api';
import { Player } from '@/app/utils/types';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const PlayersPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [players, setPlayers] = useState<Player[] | undefined>(undefined);

  useEffect(() => {
    const fetchPlayers = async () => {
      setIsLoading(true);
      const playersData = await getPlayers();
      if (playersData) {
        setPlayers(playersData);
      } else {
        console.error('Error fetching players');
      }
      setIsLoading(false);
    };

    fetchPlayers();
  }, []);

  return (
    <ComposedLayout>
      <div className="flex h-full w-full flex-col gap-4">
        {isLoading && (
          <div className="flex h-full w-full flex-col items-center justify-center">
            <Loader />
          </div>
        )}

        {!isLoading && players && (
          <div className="ml-20 mt-16 grid grid-cols-1 gap-6">
            <span className="text-3xl font-bold">Players</span>
            {players.map(player => (
              <div key={player.id} className="flex items-center justify-start gap-4">
                <Image src={player.avatar} alt={player.name} width={50} height={50} className="rounded-full" />
                <h1>{player.name}</h1>
              </div>
            ))}
          </div>
        )}

        {!isLoading && !players && (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-2xl font-bold">No players found</span>
          </div>
        )}
      </div>
    </ComposedLayout>
  );
};
export default PlayersPage;
