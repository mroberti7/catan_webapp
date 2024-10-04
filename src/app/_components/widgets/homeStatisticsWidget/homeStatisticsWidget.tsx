import GameDiceStats from '@/app/_components/widgets/gameWidget/gameDiceStats';

const data = [
  { name: '2', value: 3 },
  { name: '3', value: 4 },
  { name: '4', value: 5 },
  { name: '5', value: 6 },
  { name: '6', value: 8 },
  { name: '7', value: 10 },
  { name: '8', value: 9 },
  { name: '9', value: 9 },
  { name: '10', value: 8 },
  { name: '11', value: 6 },
  { name: '12', value: 2 },
];

const HomeStatisticsWidget = () => {
  return (
    <div className="flex h-full w-full items-center justify-center px-24 py-6">
      <div className="flex h-full w-full items-center justify-center border-4 border-secondary bg-slate-400 bg-opacity-95">
        <GameDiceStats width={630} height={270} data={data} />
      </div>
    </div>
  );
};

export default HomeStatisticsWidget;
