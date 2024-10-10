'use client';
import Button from '@/app/_components/button/button';
import ComposedLayout from '@/app/_components/layouts';
import Loader from '@/app/_components/loader/loader';
import { getAllGames } from '@/app/utils/api';
import { getSingleGameURL } from '@/app/utils/game';
import { GameDTO, GameInfoDTO } from '@/lib/generated';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { DEFAULT_LOCALE, formatDate } from '@/app/utils/date';
import { EyeIcon } from '@heroicons/react/24/outline';
import { Scenario } from '@/enum';

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

  return (
    <ComposedLayout>
      <div className="my-20 flex h-auto min-h-screen w-full flex-col items-center justify-center gap-4 p-2">
        {isLoading && <Loader />}
        {!isLoading &&
          games.map(game => (
            <div
              key={game.id}
              className={`flex w-full items-center justify-between rounded-lg border-2 border-primary bg-cover bg-bottom bg-no-repeat md:w-auto md:min-w-96`}
              style={{
                backgroundImage: `url('/assets/wallpapers/wallpaper-${game?.gameType === Scenario.Seafarers ? 'seafarers' : 'empty'}.png')`,
              }}
            >
              <div className="flex h-full w-full items-center justify-center gap-1 bg-slate-500 bg-opacity-60 p-2 md:gap-3">
                <div className="flex w-full flex-col items-center justify-center gap-2">
                  <h1 className="flex w-full items-center justify-center text-lg font-semibold text-catan-red">{game.gameName}</h1>
                  <div className="flex w-full flex-col items-center justify-start gap-1">
                    <div className="flex w-full items-center justify-between gap-2">
                      <span className="flex w-full items-center justify-start gap-2">
                        <span className="mr-1">Turns:</span>
                        <span>{game.turnNumber}</span>
                      </span>
                      <span className="flex w-full items-center justify-start gap-2">
                        <span className="mr-1">Victory Points:</span>
                        <span>{game.requiredVictoryPoints}</span>
                      </span>
                    </div>
                    <span className="flex w-full items-center justify-start gap-2">
                      <span className="mr-1">Start:</span>
                      <span>
                        {formatDate(game.startTimestamp ?? '', DEFAULT_LOCALE, {
                          weekday: 'short',
                          month: 'short',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </span>
                    <span className="flex w-full items-center justify-start gap-1">
                      {game.endTimestamp ? (
                        <>
                          <span className="mr-1">Start:</span>
                          <span>
                            {formatDate(game.startTimestamp ?? '', DEFAULT_LOCALE, {
                              weekday: 'short',
                              month: 'short',
                              day: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </>
                      ) : (
                        <span>Match in progress</span>
                      )}
                    </span>
                    {/* <span className="flex w-full items-center justify-start gap-1">
                    {game.endTimestamp ? (
                      <>
                        <span className="mr-1">Winner:</span>
                        <span>{game.winner}</span>
                      </>
                    ) : (
                      ''
                    )}
                  </span> */}
                  </div>
                </div>

                <Button onClick={() => router.push(getSingleGameURL(game.id))}>
                  <EyeIcon className="size-6" />
                </Button>
              </div>
            </div>
          ))}
      </div>
    </ComposedLayout>
  );
};
export default GamesPage;
