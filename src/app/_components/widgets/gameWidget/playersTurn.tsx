import { PlayerDTO } from '@/lib/generated';

type PlayersTurnProps = {
  players: PlayerDTO[];
};

const PlayersTurn = ({ players }: PlayersTurnProps) => {
  return (
    <div>
      PlayersTurn
      {players.map(player => (
        <div key={player.id}>
          <h1>{player.username}</h1>
        </div>
      ))}
    </div>
  );
};

export default PlayersTurn;
