'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import { ROUTES } from '@/routes';
import { getGameById } from '@/app/utils/api';
import GameWidget from '@/app/_components/widgets/gameWidget';
import ComposedLayout from '@/app/_components/layouts';
import { useEffect, useState } from 'react';
import { GameDTO } from '@/lib/generated';
import Loader from '@/app/_components/loader/loader';
import { Scenario } from '@/enum';

const Game = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [game, setGame] = useState<GameDTO | null>(null);
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
        className="mt-16 flex min-h-screen w-full flex-col items-center justify-start gap-4 bg-cover bg-bottom bg-no-repeat pb-16"
        style={{
          backgroundImage: `url('/assets/wallpapers/wallpaper-${
            game?.gameInfo.gameType === Scenario.Seafarers ? 'seafarers' : 'settlers'
          }.png')`,
        }}
      >
        {isLoading && (
          <div className="mt-80">
            <Loader />
          </div>
        )}
        {!isLoading && (game ? <GameWidget initialGame={game} /> : <div>Game not found</div>)}
      </div>
    </ComposedLayout>
  );
};

export default Game;
