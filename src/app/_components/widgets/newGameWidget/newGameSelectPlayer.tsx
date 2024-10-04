import { PlayerColor } from '@/enum';
import { PlayerDTO } from '@/lib/generated';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type NewGameSelectPlayerProps = {
  allPlayers: PlayerDTO[];
  selectedPlayers: PlayerDTO[];
  handleAddPlayer: (player: PlayerDTO, add: boolean) => void;
  playersColors: { playerId: number; color: PlayerColor }[];
  setPlayersColors: Dispatch<
    SetStateAction<
      {
        playerId: number;
        color: PlayerColor;
      }[]
    >
  >;
};

const NewGameSelectPlayer = ({
  allPlayers,
  selectedPlayers,
  handleAddPlayer,
  playersColors,
  setPlayersColors,
}: NewGameSelectPlayerProps) => {
  const [availableColors] = useState(Object.keys(PlayerColor) as Array<keyof typeof PlayerColor>);

  function getRandomColor(): PlayerColor {
    const randomIndex = Math.floor(Math.random() * availableColors.length);
    const updatedColors = [...availableColors]; // Copy the array
    const [selectedColor] = updatedColors.splice(randomIndex, 1); // Remove the selected color
    return PlayerColor[selectedColor] ?? PlayerColor.Petrol; // Return the selected color
  }

  const handleSetPlayerAndColor = (player: PlayerDTO, addToSelectedPlayers: boolean, addColorToPlayer: boolean) => {
    //TODO: rework
    if (addColorToPlayer) {
      setPlayersColors([...playersColors, { playerId: player.id ?? -1, color: getRandomColor() }]);
    } else {
      setPlayersColors([...playersColors.filter(color => color.playerId !== player.id)]);
    }
    return handleAddPlayer(player, addToSelectedPlayers);
  };

  const changePlayerColor = (player: PlayerDTO) => {
    setPlayersColors([
      ...playersColors.filter(color => color.playerId !== player.id),
      { playerId: player.id ?? -1, color: getRandomColor() },
    ]);
  };

  useEffect(() => {
    console.log('playersColors', playersColors);
    console.log('availableColors', availableColors);
  }, [playersColors, availableColors]);

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
                    onClick={() => changePlayerColor(player)}
                    className="rounded-md hover:bg-opacity-80"
                    style={{ backgroundColor: playersColors.find(color => color.playerId === player.id)?.color }}
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
