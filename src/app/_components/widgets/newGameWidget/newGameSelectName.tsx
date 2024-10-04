import { Dispatch, SetStateAction } from 'react';

type NewGameSelectNameProps = {
  gameName: string;
  setGameName: Dispatch<SetStateAction<string>>;
};

const NewGameSelectName = ({ gameName, setGameName }: NewGameSelectNameProps) => {
  return (
    <div className="flex w-full items-center justify-center gap-2">
      <span className="mr-6 text-lg font-bold">Name</span>
      <input
        type="text"
        value={gameName}
        onChange={e => setGameName(e.target.value)}
        className="h-[2rem] w-[10rem] rounded-md border-2 border-black bg-catan-red bg-opacity-45 p-1 text-center"
      />
    </div>
  );
};

export default NewGameSelectName;
