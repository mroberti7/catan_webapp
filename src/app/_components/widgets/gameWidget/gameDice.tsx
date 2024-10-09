import Loader from '@/app/_components/loader/loader';
import { getGameDiceStats } from '@/app/utils/api';
import { GamePlayerDTO, PlayerStatisticsDTO } from '@/lib/generated';
import { Dispatch, SetStateAction, useEffect, useState, useMemo } from 'react';
import { ResponsiveContainer, ComposedChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Line } from 'recharts';

type GameDiceProps = {
  gameId: number;
  diceNumber: number;
  setDiceNumber: Dispatch<SetStateAction<number>>;
  players: GamePlayerDTO[];
};

const GameDice = ({ gameId, diceNumber, setDiceNumber, players }: GameDiceProps) => {
  const [diceStats, setDiceStats] = useState<PlayerStatisticsDTO[] | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the dice stats when the component mounts
  useEffect(() => {
    const fetchDiceStats = async () => {
      try {
        const stats = await getGameDiceStats(gameId);
        setDiceStats(stats);
      } catch (err) {
        setError('Failed to fetch dice stats');
      } finally {
        setIsLoadingStats(false);
      }
    };
    fetchDiceStats();
  }, [diceNumber]);

  // Recalculate chart data when diceStats or diceNumber changes
  const chartData = useMemo(() => {
    if (!diceStats || diceStats.length === 0) return [];

    // Find the distribution for all players (playerId 0)
    const distributionData = diceStats.find(stat => stat.playerId === 0)?.statisticsDTO;
    if (!distributionData || !distributionData.diceNumber) return [];

    // Convert diceNumbers set to an array and map over it
    const diceNumbers = Array.isArray(distributionData.diceNumber) ? distributionData.diceNumber : Array.from(distributionData.diceNumber);

    const numberOfTime = distributionData.numberOfTime;

    return diceNumbers.map((diceNum, index) => {
      const row: any = {
        name: diceNum.toString(),
        distribution: numberOfTime?.[index] ?? 0, // Overall distribution
      };

      // Add each player's dice statistics for the specific diceNum
      diceStats.forEach(stat => {
        if (stat.playerId !== 0) {
          const playerStats = stat.statisticsDTO;
          const playerIndex = Array.isArray(playerStats?.diceNumber)
            ? playerStats.diceNumber.indexOf(diceNum)
            : Array.from(playerStats?.diceNumber || []).indexOf(diceNum);
          row[`user${stat.playerId}`] = playerIndex !== -1 ? playerStats?.numberOfTime?.[playerIndex] : 0;
        }
      });

      return row;
    });
  }, [diceStats, diceNumber]);

  if (isLoadingStats) return <Loader />;
  if (error) return <div>{error}</div>;
  if (chartData.length === 0) return <div>No data available.</div>;

  return (
    <div className="flex flex-col items-center justify-center gap-3 px-4 lg:px-10">
      <div className="flex min-h-52 w-full flex-wrap items-center justify-center text-wrap bg-slate-400 bg-opacity-90 py-4">
        <ResponsiveContainer width="100%" height={300}>
          {/* Adding a unique key to force re-render when diceNumber changes */}
          <ComposedChart key={diceNumber} data={chartData} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" domain={[2, 12]} />
            <YAxis domain={[0, 10]} />
            <Tooltip />
            <Legend />

            {/* Stacked Bars for players' dice rolls */}
            {players.map(player => {
              const userId = player.playerId?.toString();
              return (
                userId && (
                  <Bar
                    key={`user${userId}`}
                    dataKey={`user${userId}`}
                    stackId="a"
                    name={player.username} // Display player's name
                    fill={player.playerColor} // Use player's assigned color
                  />
                )
              );
            })}

            {/* Line Chart for overall dice distribution */}
            <Line type="monotone" dataKey="distribution" stroke="#ff7300" strokeWidth={2} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Dice number buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 lg:gap-5">
        {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(number => (
          <button
            key={number}
            onClick={() => setDiceNumber(number)}
            className={`flex size-8 items-center justify-center rounded-full border-2 md:size-14 ${
              diceNumber === number ? 'border-catan-red bg-primary text-catan-red' : 'border-primary bg-catan-red text-primary'
            } text-md p-2 font-bold md:text-lg`}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameDice;
