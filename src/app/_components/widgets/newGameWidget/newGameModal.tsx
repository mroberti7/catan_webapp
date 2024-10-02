import Modal from '@/app/_components/modal/modal';
import { createGame, getPlayers } from '@/app/utils/api/api';
import { PlayerDTO } from '@/lib/generated';
import { useState, useEffect } from 'react';
import Button from '@/app/_components/button/button';
import NewGameSelectPlayer from '@/app/_components/widgets/newGameWidget/newGameSelectPlayer';
import { createGameData, getSingleGameURL } from '@/app/utils/game';
import { useRouter } from 'next/navigation';

type NewGameModalProps = {
  isModalOpen: boolean;
  onClose: (e: Event) => void;
};
const NewGameModal = ({ isModalOpen, onClose }: NewGameModalProps) => {
  const router = useRouter();
  const [allPlayers, setAllPlayers] = useState<PlayerDTO[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<PlayerDTO[]>([]);
  const [victoryPoints, setVictoryPoints] = useState(10);

  const handleCreateGame = async () => {
    if (selectedPlayers.length < 2) {
      alert('I giocatori devono essere almeno 2');
      return;
    }
    if (selectedPlayers.length > 6) {
      alert('I giocatori devono essere al massimo 6');
      return;
    }
    if (victoryPoints < 8) {
      alert('Non fare lo scarso, almeno 8!');
      return;
    }
    const gameData = createGameData({ players: selectedPlayers, victoryPoints });
    const gameId = await createGame(gameData);
    router.push(getSingleGameURL(gameId));
  };

  const handleAddPlayer = (player: PlayerDTO, add: boolean) => {
    if (add) {
      setSelectedPlayers([...selectedPlayers, player]);
      setAllPlayers(allPlayers?.filter(p => p.id !== player.id));
    } else {
      setSelectedPlayers(selectedPlayers.filter(p => p.id !== player.id));
      setAllPlayers([...allPlayers, player]);
    }
  };

  useEffect(() => {
    const fetchPlayers = async () => {
      const playersData = await getPlayers();
      if (playersData?.length) {
        setAllPlayers(playersData);
      } else {
        console.error('Error fetching players');
      }
    };
    fetchPlayers();
  }, []);

  return (
    <Modal isModalOpen={isModalOpen} onClose={onClose}>
      <div className="max-w-dvw flex max-h-dvh min-h-[35rem] min-w-[35rem] flex-col items-center justify-start gap-5 rounded-2xl border-4 border-catan-red p-4">
        <h1 className="text-lg font-bold">New Game</h1>
        <NewGameSelectPlayer allPlayers={allPlayers} selectedPlayers={selectedPlayers} handleAddPlayer={handleAddPlayer} />
        <div className="flex w-full items-start justify-start gap-2">
          <span>Victory Points</span>
          <input
            type="number"
            className="border-1 rounded-md border-black bg-catan-red bg-opacity-45 p-1"
            value={victoryPoints}
            onChange={e => setVictoryPoints(Number(e.target.value))}
          />
        </div>
        <div className="mt-10">
          <Button onClick={handleCreateGame}>
            <span className="font-bold">Create Game</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default NewGameModal;
