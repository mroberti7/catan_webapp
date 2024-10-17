import Loader from '@/app/_components/loader/loader';
import NumberIcon from '@/app/_components/numberIcon/numberIcon';
import { getGameDiceStats } from '@/app/utils/api';
import { GamePlayerDTO, PlayerStatisticsDTO } from '@/lib/generated';
import { Dispatch, SetStateAction, useEffect, useState, useMemo } from 'react';
import { ResponsiveContainer, ComposedChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Line } from 'recharts';

type GameDiceProps = {
  gameId: number;
  isGameEnded: boolean;
  diceNumber: null | number;
  setDiceNumber: Dispatch<SetStateAction<null | number>>;
  players: GamePlayerDTO[];
  refreshDiceStats: boolean;
  setRefreshDiceStats: Dispatch<SetStateAction<boolean>>;
  minimalLayout: boolean;
};

const GameDice = ({
  gameId,
  isGameEnded,
  diceNumber,
  setDiceNumber,
  players,
  refreshDiceStats,
  setRefreshDiceStats,
  minimalLayout,
}: GameDiceProps) => {
  const [diceStats, setDiceStats] = useState<PlayerStatisticsDTO[] | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiceStats = async () => {
      try {
        const stats = await getGameDiceStats(gameId);
        setDiceStats(stats);
      } catch (err) {
        setError('Failed to fetch dice stats');
      } finally {
        setIsLoadingStats(false);
        setRefreshDiceStats(false);
      }
    };

    if (refreshDiceStats || !diceNumber) {
      fetchDiceStats();
    }
  }, [diceNumber, gameId, refreshDiceStats]);

  // Recalculate chart data when diceStats or diceNumber changes
  const chartData = useMemo(() => {
    if (!diceStats || diceStats.length === 0) return [];

    // Find the distribution for all players (playerId 0)
    const distributionData = diceStats.find(stat => stat.playerId === 0)?.statisticsDTO;
    if (!distributionData || !distributionData.diceNumber) return [];

    const diceNumbers = Array.isArray(distributionData.diceNumber) ? distributionData.diceNumber : Array.from(distributionData.diceNumber);
    const numberOfTime = distributionData.numberOfTime;

    return diceNumbers.map((diceNum, index) => {
      const row: any = {
        name: diceNum.toString(),
        distribution: numberOfTime?.[index] ?? 0,
      };

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
  }, [diceStats]);

  if (isLoadingStats) return <Loader />;
  if (error) return <div>{error}</div>;
  if (chartData.length === 0) return <div>No data available.</div>;

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      {!isGameEnded && (
        <div className="flex flex-wrap items-center justify-center gap-2 lg:gap-5">
          {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(number => (
            <button key={number} onClick={() => setDiceNumber(number)}>
              <NumberIcon number={number} selected={diceNumber === number} size={'size-12 md:size-16'} minimalLayout={minimalLayout} />
            </button>
          ))}
        </div>
      )}
      <div className="flex min-h-52 w-full flex-wrap items-center justify-center text-wrap bg-slate-400 bg-opacity-50 px-4 md:px-6 lg:px-12">
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart width={500} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" strokeWidth={3} />
            <XAxis dataKey="name" domain={[2, 12]} stroke="#333" fontSize={20} strokeWidth={3} />
            <YAxis domain={[0, 10]} stroke="#333" fontSize={20} strokeWidth={3} />
            <Tooltip />
            <Legend />
            {players.map(player => {
              const userId = player.playerId?.toString();
              return (
                userId && (
                  <Bar key={`user${userId}`} dataKey={`user${userId}`} stackId="a" name={player.username} fill={player.playerColor} />
                )
              );
            })}
            <Line type="monotone" dataKey="distribution" stroke="#ff7300" strokeWidth={3} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GameDice;
