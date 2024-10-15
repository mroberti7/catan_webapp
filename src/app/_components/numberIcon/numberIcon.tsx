import Image from 'next/image';

type NumberIconProps = {
  number: number;
  selected?: boolean;
  size?: string;
  minimalLayout: boolean;
};

const NumberIcon = ({ number, size = 'size-10', selected = false, minimalLayout }: NumberIconProps) => {
  return minimalLayout ? (
    <div
      className={`flex size-8 items-center justify-center rounded-full border-2 md:size-14 ${
        selected ? 'border-catan-red bg-primary text-catan-red' : 'border-primary bg-catan-red text-primary'
      } text-md p-2 font-bold md:text-lg`}
    >
      {number}
    </div>
  ) : (
    <div className={`relative flex ${size} items-center justify-center`}>
      {number <= 12 ? (
        <Image src={`/assets/numbers/${number}${selected ? '-pressed' : ''}.png`} alt={`number-${number}`} fill />
      ) : (
        <div className="flex size-10 items-center justify-center rounded-full border-2 border-primary p-4">{number}</div>
      )}
    </div>
  );
};

export default NumberIcon;
