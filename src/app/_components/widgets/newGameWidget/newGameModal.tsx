import Modal from '@/app/_components/modal/modal';
import { createGame, getPlayers } from '@/app/utils/api/api';
import { GamePlayerInfoDTO, PlayerDTO } from '@/lib/generated';
import { useState, useEffect } from 'react';
import Button from '@/app/_components/button/button';
import NewGameSelectPlayer from '@/app/_components/widgets/newGameWidget/newGameSelectPlayer';
import { createGameData, getSingleGameURL } from '@/app/utils/game';
import { useRouter } from 'next/navigation';
import { MAX_GAME_PLAYERS, MAX_GAME_VICTORY_POINTS, MIN_GAME_PLAYERS, MIN_GAME_VICTORY_POINTS } from '@/costants';
import NewGameVictoryPoints from '@/app/_components/widgets/newGameWidget/newGameVictoryPoints';
import { PlayerColor, Scenario } from '@/enum';
import NewGameSelectScenario from '@/app/_components/widgets/newGameWidget/newGameSelectScenario';
import NewGameSelectName from '@/app/_components/widgets/newGameWidget/newGameSelectName';

type NewGameModalProps = {
  isModalOpen: boolean;
  onClose: (e: Event) => void;
};

const NewGameModal = ({ isModalOpen, onClose }: NewGameModalProps) => {
  const router = useRouter();
  const [gameName, setGameName] = useState<string>('');
  const [allPlayers, setAllPlayers] = useState<PlayerDTO[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<PlayerDTO[]>([]);
  const [playersColors, setPlayersColors] = useState<{ playerId: number; color: PlayerColor }[]>([]);
  const [victoryPoints, setVictoryPoints] = useState(10);
  const [scenario, setScenario] = useState<Scenario>(Scenario.Standard);
  const [error, setError] = useState<string | null>(null);

  const validateGame = () => {
    setError('');
    if (!gameName) {
      setError('Dai inventati un bel nome per la partita! 🫶🏾');
      return false;
    }
    if (selectedPlayers.length < MIN_GAME_PLAYERS) {
      setError('I giocatori devono essere almeno 2 🤌🏽');
      return false;
    }
    if (selectedPlayers.length > MAX_GAME_PLAYERS) {
      setError('I giocatori devono essere al massimo 6 😫');
      return false;
    }
    if (victoryPoints < MIN_GAME_VICTORY_POINTS) {
      setError('Non fare lo scarso, almeno 8! 👎🏾');
      return false;
    }
    if (victoryPoints > MAX_GAME_VICTORY_POINTS) {
      setError('Non esagerare, massimo 16! 😏');
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (error !== null) {
      validateGame();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPlayers, victoryPoints]);

  const handleCreateGame = async () => {
    if (validateGame()) {
      const gameData = createGameData({
        gameName,
        playersIds: selectedPlayers?.map(player => player?.id ?? -1),
        playersColors,
        victoryPoints,
        scenario,
      });
      const gameId = await createGame(gameData);
      if (!gameId) {
        setError('Errore nella creazione della partita, colpa di Giovanni');
        return;
      }
      router.push(getSingleGameURL(gameId));
    }
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
      console.log('playersData', playersData);
      if (playersData?.length) {
        setAllPlayers(playersData);
      } else {
        console.error('Error fetching players');
      }
    };
    fetchPlayers();
  }, []);

  useEffect(() => {}, [selectedPlayers]);

  return (
    <Modal isModalOpen={isModalOpen} onClose={onClose}>
      <div className="flex h-auto w-auto flex-col items-center justify-start gap-5 rounded-2xl border-4 border-catan-red p-4">
        <h1 className="text-lg font-bold">New Game</h1>
        <NewGameSelectName gameName={gameName} setGameName={setGameName} />
        <NewGameSelectPlayer
          allPlayers={allPlayers}
          selectedPlayers={selectedPlayers}
          handleAddPlayer={handleAddPlayer}
          playersColors={playersColors}
          setPlayersColors={setPlayersColors}
        />
        <div className="flex w-full flex-col gap-3">
          <NewGameVictoryPoints victoryPoints={victoryPoints} setVictoryPoints={setVictoryPoints} />
          <NewGameSelectScenario scenario={scenario} setScenario={setScenario} />
        </div>
        <div className="mt-10">
          <Button onClick={handleCreateGame}>
            <span className="text-lg font-bold">Create Game</span>
          </Button>
        </div>
        <div className="h-3">{error && <p className="font-semibold text-red-700">{error}</p>}</div>
      </div>
    </Modal>
  );
};

export default NewGameModal;
