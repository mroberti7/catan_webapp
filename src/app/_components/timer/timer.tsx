import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

type TimerProps = {
  onRef?: React.Ref<any>;
};

const Timer = forwardRef((_, ref) => {
  const [timeLeft, setTimeLeft] = useState(3); // 3 seconds for quick testing
  const [isRunning, setIsRunning] = useState(true);

  // Timer logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  // Add time
  const addTime = () => {
    setTimeLeft(prevTime => prevTime + 30);
  };

  // Reset and restart timer
  const resetAndRestartTimer = () => {
    setTimeLeft(120); // Reset to 2 minutes
    setIsRunning(true); // Restart
  };

  // Expose methods to parent via ref
  useImperativeHandle(ref, () => ({
    resetAndRestartTimer,
  }));

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center justify-center gap-3">
      <button onClick={() => setIsRunning(!isRunning)}>
        <span className="flex size-[6rem] items-center justify-center text-4xl">{isRunning ? '⏸️' : '▶️'}</span>
      </button>
      <div
        className={`flex items-center justify-center rounded-lg border-2 p-2 text-5xl font-bold ${
          timeLeft === 0 ? 'animate-blink border-red-500' : 'border-gray-300 bg-catan-red'
        }`}
      >
        {formatTime(timeLeft)}
      </div>
      <button className="ml-2" onClick={addTime}>
        <span className="flex w-auto items-center justify-center rounded-lg border-2 bg-gray-500 p-2 text-2xl text-white">+30</span>
      </button>
    </div>
  );
});

export default Timer;
