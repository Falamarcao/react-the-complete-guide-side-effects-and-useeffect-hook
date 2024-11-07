import { useEffect, useState } from 'react';

interface DeleteConfirmationProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const TIMER = 3000;
const STEP = 50;

export default function DeleteConfirmation({
  onConfirm,
  onCancel,
}: DeleteConfirmationProps) {
  const [remainingTime, setRemainingTime] = useState<number>(TIMER);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('INTERVAL');
      setRemainingTime((prevTime: number) => prevTime - STEP);
    }, STEP);

    return () => {
      console.log('Clean up INTERVAL');
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    console.log('TIMER SET');
    const timer = setTimeout(() => {
      onConfirm();
    }, TIMER);

    return () => {
      console.log('Clean up TIMER');
      clearTimeout(timer);
    };
  }, [onConfirm]);

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      <progress value={remainingTime} max={TIMER} />
    </div>
  );
}
