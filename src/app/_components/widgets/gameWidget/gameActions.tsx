import Button from '@/app/_components/button/button';

const GameActions = () => {
  return (
    <div className="flex h-auto min-h-40 w-full items-center justify-center p-8">
      <div className="grid grid-cols-4 gap-8">
        <Button onClick={() => {}}>
          <span className="text-wrap text-sm md:text-lg">Do something</span>
        </Button>
        <Button onClick={() => {}}>
          <span className="text-wrap text-sm md:text-lg">Do something</span>
        </Button>
        <Button onClick={() => {}}>
          <span className="text-wrap text-sm md:text-lg">Do something</span>
        </Button>
        <Button onClick={() => {}}>
          <span className="text-wrap text-sm md:text-lg">Do something</span>
        </Button>
      </div>
    </div>
  );
};

export default GameActions;
