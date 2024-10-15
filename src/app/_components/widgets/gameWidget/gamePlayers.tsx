import { GameInfoDTO, GamePlayerDTO } from '@/lib/generated';
import { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import {
  ArrowTrendingUpIcon,
  BuildingLibraryIcon,
  BuildingOffice2Icon,
  ChevronDownIcon,
  ChevronUpIcon,
  QuestionMarkCircleIcon,
  ScissorsIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline';
import { formatDate } from '@/app/utils/date';

type GamePlayersProps = {
  gameInfo: GameInfoDTO;
  players: GamePlayerDTO[];
  showPlayers: boolean;
  setShowPlayers: Dispatch<SetStateAction<boolean>>;
  currentPlayerToPlay: GamePlayerDTO;
};

const GamePlayers = ({ gameInfo, players, showPlayers, setShowPlayers, currentPlayerToPlay }: GamePlayersProps) => {
  return (
    <>
      <div
        id="players"
        className={`flex w-full flex-col overflow-hidden bg-gradient-to-b from-slate-600/80 to-slate-600/5 px-2 transition-all duration-500 ${showPlayers ? 'max-h-[100vh] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        {showPlayers ? (
          <>
            <div id="game-info" className="flex w-full flex-wrap items-center justify-center gap-3 px-3 pt-8 md:justify-between md:pt-2">
              <span> Start: {formatDate(gameInfo.startTimestamp)}</span>
              <h1> {gameInfo.gameName}</h1>
              <div className="flex items-center gap-1">
                <TrophyIcon className="size-4" />
                {gameInfo.requiredVictoryPoints}
              </div>
              <div>Turn: {gameInfo?.turnNumber ?? 0 + 1}</div>
              <span> {gameInfo.endTimestamp ? `End: ${formatDate(gameInfo.endTimestamp)}` : 'Match in progress'}</span>
            </div>
            <div className="flex w-full flex-wrap justify-center gap-2 px-2 py-2 lg:gap-12">
              {players.map(player => (
                <div key={player.playerId} className="flex justify-start">
                  {player.avatarUrl && (
                    <div className="relative flex size-12 lg:size-24">
                      <Image
                        src={player.avatarUrl}
                        alt={player.username ?? 'userAvatar'}
                        fill
                        className={`opacity-b-80 rounded-lg border-4 ${player.playerId === currentPlayerToPlay?.playerId ? 'animate-blink border-transparent' : 'border-yellow-600'}`}
                        style={{ backgroundColor: player.playerColor }}
                      />
                    </div>
                  )}
                  <div className="-ml-1 w-full">
                    <div
                      className={`mt-1 flex w-full items-center justify-between rounded-e-md border-y-2 border-r-2 ${player.playerId === currentPlayerToPlay?.playerId ? 'animate-blink border-transparent' : 'border-yellow-600'} px-2`}
                      style={{ backgroundColor: player.playerColor }}
                    >
                      <h1 className="text-md col-span-3 ml-2 text-wrap font-bold">{player.username}</h1>
                      <span className="text-md flex items-center gap-1 font-bold">
                        <TrophyIcon className="size-5" /> {player.plainScore}
                      </span>
                    </div>
                    <div
                      className="mb-2 mr-2 flex justify-between gap-1 rounded-b-md bg-opacity-70 p-1 pl-2"
                      style={{ backgroundColor: player.playerColor }}
                    >
                      <div
                        className={`flex flex-col items-center justify-center gap-2 ${player.longestRoad ? 'animate-blink rounded-xl border-2 border-transparent p-1' : ''}`}
                      >
                        <div className="relative flex size-5 items-center justify-center">
                          <Image src={'/assets/icons/road.png'} alt="road" fill />
                        </div>
                        <span>{player.roadsBuilt}</span>
                      </div>
                      <div className="flex flex-col items-center justify-center gap-2">
                        <div className="relative flex size-5 items-center justify-center">
                          <Image src={'/assets/icons/colony.png'} alt="road" fill />
                        </div>
                        <span>{player.coloniesBuilt}</span>
                      </div>
                      <div className="flex flex-col items-center justify-center gap-2">
                        <div className="relative flex size-5 items-center justify-center">
                          <Image src={'/assets/icons/city.png'} alt="road" fill />
                        </div>
                        <span>{player.citiesBuilt}</span>
                      </div>
                      <div
                        className={`flex flex-col items-center justify-center gap-2 ${player.largestArmy ? 'animate-blink rounded-xl border-2 border-transparent p-1' : ''}`}
                      >
                        <div className="relative flex size-5 items-center justify-center">
                          <Image src={'/assets/icons/knight.png'} alt="road" fill />
                        </div>
                        <span>{player.knightCardPlayed}</span>
                      </div>
                      <div className="flex flex-col items-center justify-center gap-2">
                        <div className="relative flex size-5 items-center justify-center">
                          <Image src={'/assets/icons/card.png'} alt="road" fill />
                        </div>
                        <span>{player.developCardDrawn}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="flex w-full items-start justify-center" onClick={() => setShowPlayers(false)}>
              <div className="flex h-7 w-14 items-start justify-center rounded-t-md bg-red-800">
                <ChevronUpIcon className="size-8" />
              </div>
            </button>
          </>
        ) : null}
      </div>

      {!showPlayers && (
        <div className="flex w-full flex-col">
          <div className="flex w-full flex-wrap justify-center gap-3 bg-gradient-to-b from-slate-600/80 to-slate-600/10 px-6 py-2 pb-1 md:flex-nowrap md:gap-10">
            {players.map((player, index) => (
              <div className="flex items-center justify-center">
                {player.avatarUrl && (
                  <div className="relative flex size-10">
                    <Image
                      src={player.avatarUrl}
                      alt={player.username ?? 'userAvatar'}
                      fill
                      className={`opacity-b-80 rounded-lg border-2 ${player.playerId === currentPlayerToPlay?.playerId ? 'animate-blink border-transparent' : 'border-yellow-600'}`}
                      style={{ backgroundColor: player.playerColor }}
                    />
                  </div>
                )}
                <div
                  key={player.playerId}
                  className={`-ml-2 mt-1 flex w-full min-w-32 items-center justify-between rounded-md border-2 border-y-2 px-2 ${player.playerId === currentPlayerToPlay?.playerId ? 'animate-blink border-transparent' : 'border-yellow-600'}`}
                  style={{ backgroundColor: player.playerColor }}
                >
                  <h1 className="text-md col-span-3 text-wrap font-bold">{player.username}</h1>
                  <span className="text-md flex items-center gap-1 font-bold">
                    <TrophyIcon className="size-5" /> {player.plainScore}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="flex w-full items-start justify-center" onClick={() => setShowPlayers(true)}>
            <div className="flex h-7 w-14 items-start justify-center rounded-b-md bg-red-800">
              <ChevronDownIcon className="size-8" />
            </div>
          </button>
        </div>
      )}
    </>
  );
};

export default GamePlayers;
