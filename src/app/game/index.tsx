'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import { ROUTES } from '@/routes';
import { getGameById } from '@/app/utils/api/api';
import GameWidget from '@/app/_components/widgets/gameWidget';
import ComposedLayout from '@/app/_components/layouts';
import { useEffect, useState } from 'react';
import { GameDTO, PageGameDTO } from '@/lib/generated';
import Loader from '@/app/_components/loader/loader';
import { Scenario } from '@/enum';

const Game = () => {
  //TODO: fetch also GamePlayers and all other game info until it's everything under a single endpoint?
  const router = useRouter();
  const searchParams = useSearchParams();
  const [game, setGame] = useState<GameDTO | null>(null); //TODO: CHANGE type
  const [isLoading, setLoading] = useState(true);
  const gameId = parseInt(searchParams.get('id') ?? '', 10);
  if (isNaN(gameId)) {
    router.push(ROUTES.GAMES.pathname);
  }

  useEffect(() => {
    const fetchGame = async () => {
      setLoading(true);
      const gameData = await getGameById(gameId);
      if (!gameData) {
        notFound();
      }
      setGame(gameData);
      setLoading(false);
    };
    fetchGame();
  }, [gameId]);

  return (
    <ComposedLayout>
      <div
        className="flex h-full w-full flex-col items-center justify-center gap-4 bg-cover bg-bottom bg-no-repeat"
        style={{
          backgroundImage: `url('/assets/wallpapers/wallpaper-${
            (game as any)?.scenario === Scenario.Seafarers ? 'seafarers' : 'settlers'
          }.png')`,
        }}
      >
        {isLoading && <Loader />}
        {!isLoading && (game ? <GameWidget game={game} /> : <div>Game not found</div>)}
      </div>
    </ComposedLayout>
  );
};

export default Game;
