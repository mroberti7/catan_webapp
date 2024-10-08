'use client';
import Button from '@/app/_components/button/button';
import ComposedLayout from '@/app/_components/layouts';
import Loader from '@/app/_components/loader/loader';
import { getAllGames } from '@/app/utils/api/api';
import { getSingleGameURL } from '@/app/utils/game';
import { GameDTO, GameInfoDTO } from '@/lib/generated';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { formatDate } from '@/app/utils/date';

const GamesPage = () => {
  const router = useRouter();
  const [games, setGames] = useState<GameInfoDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchGames = async () => {
      setIsLoading(true);
      const games = await getAllGames();
      setGames(games);
      setIsLoading(false);
    };
    fetchGames();
  }, []);

  //TODO: remove any
  return (
    <ComposedLayout>
      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
        {isLoading && <Loader />}
        {!isLoading &&
          games.map(game => (
            <div key={(game as any).id} className="flex items-center justify-center gap-6 rounded-md border-2 border-secondary p-3">
              <h1>ID: {(game as any).id}</h1>
              <h1>Start: {formatDate((game as any).startTimestamp ?? '')}</h1>
              <Button onClick={() => router.push(getSingleGameURL((game as any).id))}>View Game</Button>
            </div>
          ))}
      </div>
    </ComposedLayout>
  );
};
export default GamesPage;
