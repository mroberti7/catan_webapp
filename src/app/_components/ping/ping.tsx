import { checkServerStatus } from '@/app/utils/api/api';
import { useEffect, useState } from 'react';

type PingProps = {
  showTriggerButton?: boolean;
};

const statusMap = {
  inactive: 'bg-red-600',
  checking: 'bg-yellow-600',
  active: 'bg-green-600',
};
const Ping = ({ showTriggerButton = false }: PingProps) => {
  const [statusBg, setStatusBg] = useState(statusMap.active);

  const handlePing = async () => {
    setStatusBg(statusMap.checking);
    const isServerActive = await checkServerStatus();
    setStatusBg(isServerActive ? statusMap.active : statusMap.inactive);
  };

  useEffect(() => {
    handlePing();
    setInterval(handlePing, 10000);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 rounded-lg bg-primary p-4">
      <div className={`size-10 rounded-full shadow-xl ${statusBg}`}></div>
      {showTriggerButton && (
        <button onClick={handlePing} className="h-8 w-12 rounded-lg bg-black">
          Ping
        </button>
      )}
    </div>
  );
};

export default Ping;
