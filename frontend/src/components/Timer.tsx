import { useState, useEffect, useRef } from 'react';
import { SkillIf } from '../interface/IF';
import { FaPlusCircle } from 'react-icons/fa';
import { Types } from 'mongoose';

interface Prop {
  skill: SkillIf;
  addStep: (id: Types.ObjectId, time: number) => void;
}

const Timer = ({ skill, addStep }: Prop) => {
  const [seconds, setSeconds] = useState(0);
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning && intervalId === null) {
      const id = window.setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
      setIntervalId(id);
    }

    return () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
    };
  }, [isRunning, intervalId]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const createStep = () => {
    if (seconds < 60) {
      alert('invalid time has to be equal or more than 60 seconds');
      return;
    }
    const addedSkillLevel = (seconds / 60).toFixed(2);
    addStep(skill._id, Number(addedSkillLevel));
    setSeconds(0);

    //addStep
  };

  return (
    <div className="flex flex-col gap-5 justify-center font-bold ">
      <div className="text-3xl"> {seconds}</div>

      <div className="flex  ">
        <button
          onClick={startTimer}
          className="dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 px-5 rounded-l-full"
          aria-label="Start Timer button"
        >
          Start
        </button>
        <FaPlusCircle
          onClick={createStep}
          size={35}
          className="addTime scale-150  rounded-full "
          aria-label="Add time to Skill button"
        />
        <button
          onClick={stopTimer}
          className="dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 px-5 rounded-r-full"
          aria-label="Stop Timer button"
        >
          Stop
        </button>
      </div>
    </div>
  );
};

export default Timer;
