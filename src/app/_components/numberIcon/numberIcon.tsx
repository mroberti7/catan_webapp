import Image from 'next/image';

type NumberIconProps = {
  number: number;
  selected?: boolean;
  size?: string;
};

const NumberIcon = ({ number, size = 'size-10', selected = false }: NumberIconProps) => {
  return (
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
