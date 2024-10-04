import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

type GameDiceStatsProps = {
  data: {
    name: string;
    value: number;
  }[];
  width: number;
  height: number;
};

const GameDiceStats = ({ data, width, height }: GameDiceStatsProps) => {
  return (
    <>
      <LineChart width={width} height={height} data={data}>
        <XAxis />
        <YAxis />
        <Tooltip />
        <CartesianGrid strokeDasharray="2 2 2 2" strokeWidth={2} />
        <Line type="monotone" dataKey="value" stroke="#8F1D27" strokeWidth={3} />
      </LineChart>
    </>
  );
};

export default GameDiceStats;
