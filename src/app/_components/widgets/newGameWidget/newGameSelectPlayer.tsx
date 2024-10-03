import { PlayerColor } from '@/enum';
import { PlayerDTO } from '@/lib/generated';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useState } from 'react';

type NewGameSelectPlayerProps = {
  allPlayers: PlayerDTO[];
  selectedPlayers: PlayerDTO[];
  handleAddPlayer: (player: PlayerDTO, add: boolean) => void;
};

const NewGameSelectPlayer = ({ allPlayers, selectedPlayers, handleAddPlayer }: NewGameSelectPlayerProps) => {
  const [playerColor, setPlayerColor] = useState<string>(PlayerColor.Petrol); //TODO: TMP
  const availableColors = Object.keys(PlayerColor) as Array<keyof typeof PlayerColor>;

  function getRandomColor(): PlayerColor {
    const randomIndex = Math.floor(Math.random() * availableColors.length);
    const selectedColorKey = availableColors[randomIndex];
    availableColors.splice(randomIndex, 1);
    return PlayerColor[selectedColorKey] ?? PlayerColor.Petrol;
  }

  const handleSetPlayerAndColor = (player: PlayerDTO, addToSelectedPlayers: boolean, addColorToPlayer: boolean) => {
    if (addColorToPlayer && !addToSelectedPlayers) {
      setPlayerColor(getRandomColor());
    } else {
      return handleAddPlayer(player, addToSelectedPlayers);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex items-center justify-between gap-4">
        <div className="border-1 flex h-[23rem] w-[15rem] flex-col items-center justify-start overflow-y-scroll rounded-md border-primary bg-catan-red bg-opacity-45 pb-4">
          <div className="text-md fixed z-20 flex h-[3rem] w-[15rem] items-center justify-center rounded-t-md bg-catan-red font-bold text-primary">
            Select Player
          </div>
          <div className="mt-14 flex flex-col items-start gap-2">
            {allPlayers?.map(player => (
              <div className="flex w-full items-center justify-between gap-2 rounded-md border-2 border-black p-1" key={player.id}>
                {player.avatarUrl && <Image src={player.avatarUrl} alt={player.username ?? 'userAvatar'} width={40} height={40} />}
                <span className="text-sm">{player.username}</span>
                <button className="rounded-md bg-catan-red hover:bg-opacity-80" onClick={() => handleSetPlayerAndColor(player, true, true)}>
                  <ArrowRightIcon className="text-bold size-8 text-primary" />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="border-1 flex h-[23rem] w-[15rem] flex-col items-center justify-start overflow-y-scroll rounded-md border-primary bg-catan-red bg-opacity-45 pb-4">
          <div className="text-md fixed z-20 flex h-[3rem] w-[15rem] items-center justify-center rounded-t-md bg-catan-red font-bold text-primary">
            Selected Player (ordered)
          </div>
          <div className="mt-14 flex flex-col items-start gap-2">
            {selectedPlayers?.map(player => (
              <div className="flex w-full items-center justify-between gap-2 rounded-md border-2 border-black p-1" key={player.id}>
                <div className="flex w-full items-center justify-between gap-3">
                  <button
                    className="rounded-md bg-catan-red hover:bg-opacity-80"
                    onClick={() => handleSetPlayerAndColor(player, false, false)}
                  >
                    <ArrowLeftIcon className="text-bold size-8 text-primary" />
                  </button>{' '}
                  <span className="text-sm">{player.username}</span>
                  <button
                    onClick={() => handleSetPlayerAndColor(player, false, true)}
                    className="rounded-md hover:bg-opacity-80"
                    style={{ backgroundColor: playerColor }}
                  >
                    {player.avatarUrl && <Image src={player.avatarUrl} alt={player.username ?? 'userAvatar'} width={40} height={40} />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewGameSelectPlayer;
