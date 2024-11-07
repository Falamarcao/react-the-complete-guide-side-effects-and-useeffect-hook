import { useEffect, useState } from 'react';

interface ProgressBarProps {
  max: number;
}

const ProgressBar = ({ max }: ProgressBarProps) => {
  const [remainingTime, setRemainingTime] = useState<number>(max);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('INTERVAL');
      setRemainingTime((prevTime: number) => prevTime - 50);
    }, 50);

    return () => {
      console.log('Clean up INTERVAL');
      clearInterval(interval);
    };
  }, []);

  return <progress value={remainingTime} max={max} />;
};

export default ProgressBar;
