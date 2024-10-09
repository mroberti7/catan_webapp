import { checkServerStatus } from '@/app/utils/api';
import { useEffect, useState } from 'react';

type PingProps = {
  showTriggerButton?: boolean;
  showBackground?: boolean;
};

const statusMap = {
  inactive: 'bg-red-600',
  checking: 'bg-yellow-600',
  active: 'bg-green-600',
};
const Ping = ({ showTriggerButton = false, showBackground = true }: PingProps) => {
  const [statusBg, setStatusBg] = useState(statusMap.active);

  const handlePing = async () => {
    setStatusBg(statusMap.checking);
    const isServerActive = await checkServerStatus();
    setStatusBg(isServerActive ? statusMap.active : statusMap.inactive);
  };

  useEffect(() => {
    handlePing();
    setInterval(handlePing, 20000);
  }, []);

  return (
    <div className={`flex flex-col items-center gap-4 rounded-lg bg-opacity-80 ${showBackground ? 'bg-primary p-4' : 'bg-transparent'}`}>
      <div className={`${showBackground ? 'size-10' : 'size-6'} rounded-full shadow-xl ${statusBg} border-1 border-gray-800`}></div>
      {showTriggerButton && (
        <button onClick={handlePing} className="h-8 w-12 rounded-lg bg-black">
          Ping
        </button>
      )}
    </div>
  );
};

export default Ping;
