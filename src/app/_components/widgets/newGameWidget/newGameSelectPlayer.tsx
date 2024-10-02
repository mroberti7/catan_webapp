import { PlayerDTO } from '@/lib/generated';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

type NewGameSelectPlayerProps = {
  allPlayers: PlayerDTO[];
  selectedPlayers: PlayerDTO[];
  handleAddPlayer: (player: PlayerDTO, add: boolean) => void;
};

const NewGameSelectPlayer = ({ allPlayers, selectedPlayers, handleAddPlayer }: NewGameSelectPlayerProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <span>Players</span>
      <div className="flex items-center justify-between gap-10">
        <div className="border-1 flex h-[16rem] w-[15rem] flex-col items-center justify-start overflow-y-scroll rounded-md border-primary bg-catan-red bg-opacity-45 p-4">
          <div className="fixed z-20 bg-white text-lg font-bold">Select Player</div>
          <div className="mt-8 flex flex-col items-start gap-2">
            {allPlayers?.map(player => (
              <div className="flex items-center justify-center gap-3 rounded-md" key={player.id}>
                {player.avatarUrl && <Image src={player.avatarUrl} alt={player.username ?? 'userAvatar'} width={40} height={40} />}
                <span className="text-sm">{player.username}</span>
                <button className="rounded-md bg-catan-red bg-opacity-45 hover:bg-opacity-80" onClick={() => handleAddPlayer(player, true)}>
                  <ArrowRightIcon className="text-bold size-8 text-primary hover:text-red-500" />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="border-1 flex h-[16rem] w-[15rem] flex-col items-center justify-start overflow-y-scroll rounded-md border-primary bg-catan-red bg-opacity-45 p-4">
          <div className="fixed z-20 bg-white text-lg font-bold">Selected Player (ordered)</div>
          <div className="mt-8 flex flex-col items-start gap-2">
            {selectedPlayers?.map(player => (
              <div key={player.id}>
                <div className="flex items-center justify-center gap-1 rounded-md">
                  <button
                    className="rounded-md bg-catan-red bg-opacity-45 hover:bg-opacity-80"
                    onClick={() => handleAddPlayer(player, false)}
                  >
                    <ArrowLeftIcon className="text-bold size-8 text-primary hover:text-red-500" />
                  </button>
                  {player.avatarUrl && <Image src={player.avatarUrl} alt={player.username ?? 'userAvatar'} width={40} height={40} />}
                  <span className="text-sm">{player.username}</span>
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
