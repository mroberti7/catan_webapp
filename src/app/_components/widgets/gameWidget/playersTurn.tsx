import { PlayerDTO } from '@/lib/generated';
import { useState } from 'react';
import Image from 'next/image';
import {
  ArrowTrendingUpIcon,
  BuildingLibraryIcon,
  BuildingOffice2Icon,
  QuestionMarkCircleIcon,
  ScissorsIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline';
import { PlayerColor } from '@/enum';

type PlayersTurnProps = {
  players: PlayerDTO[];
};

const PlayersTurn = ({ players }: PlayersTurnProps) => {
  const [playersMock] = useState<PlayerDTO[]>(
    !!players.length
      ? players
      : [
          {
            id: 1,
            username: 'Sheldon Cooper',
            email: 'twanna@email.com',
            avatarUrl: 'https://robohash.org/wcnlbkzp.png',
            deleted: false,
          },
          {
            id: 2,
            username: 'Leonard Hofstadter',
            email: 'luis@email.com',
            avatarUrl: 'https://robohash.org/dctpgxnh.png',
            deleted: false,
          },
          {
            id: 3,
            username: 'Leslie Winkle',
            email: 'delmar@email.com',
            avatarUrl: 'https://robohash.org/odfonldg.png',
            deleted: false,
          },
          {
            id: 4,
            username: 'Sheldon Cooper',
            email: 'eddy@email.com',
            avatarUrl: 'https://robohash.org/sentetyk.png',
            deleted: false,
          },
        ],
  );

  //TODO: manage player colors

  const playerColor = PlayerColor.Blue; //TODO: obtain from player

  return (
    <div className="flex w-full justify-between gap-3 px-2 py-2">
      {playersMock.map(player => (
        <div key={player.id} className="flex justify-start">
          {player.avatarUrl && (
            <Image
              src={player.avatarUrl}
              alt={player.username ?? 'userAvatar'}
              width={90}
              height={90}
              className="opacity-b-80 rounded-lg border-4 border-yellow-600"
              style={{ backgroundColor: playerColor }}
            />
          )}
          <div className="w-full">
            <div
              className="mt-1 flex w-full items-center justify-between rounded-e-md border-y-2 border-r-2 border-yellow-600 px-2"
              style={{ backgroundColor: playerColor }}
            >
              <h1 className="text-md col-span-3 text-wrap font-bold">{player.username}</h1>
              <span className="text-md flex items-center gap-1 font-bold">
                <TrophyIcon className="size-5" /> 10
              </span>
            </div>
            <div className="mb-2 mr-2 flex justify-between gap-2 rounded-br-md bg-opacity-70 p-2" style={{ backgroundColor: playerColor }}>
              <div className="flex flex-col items-center justify-center gap-2">
                <BuildingLibraryIcon className="size-5" />
                <span>5</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-2">
                <BuildingOffice2Icon className="size-5" />
                <span>4</span>
              </div>
              {/* TODO: Evidenziare se si hanno i 2 punti extra */}
              <div className="flex flex-col items-center justify-center gap-2">
                <ArrowTrendingUpIcon className="size-5" />
                <span>9</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-2">
                <ScissorsIcon className="size-5" />
                <span>2</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-2">
                <QuestionMarkCircleIcon className="size-5" />
                <span>3</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlayersTurn;
