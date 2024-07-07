import { useState, useEffect } from 'react';
import useSkill from './hook/skillHook';
import SkillCard from './components/SkillCard';
import {
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
  FaPlusCircle,
} from 'react-icons/fa';

function App() {
  const { skills, createSkill, getSkills, deleteSkill, addStep, updateSkill } =
    useSkill();

  const [current, setCurrent] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const [time, setTime] = useState<number>(0);

  const [canStep, setCanStep] = useState<Boolean>(true);
  const [canCreate, setCanCreate] = useState<Boolean>(true);

  useEffect(() => {
    getSkills();
  }, []);

  return (
    <>
      <div className="  w-screen h-screen bg-red-500 text-center flex flex-col items-center gap-4 text-white ">
        <div className="text-3xl font-bold underline ">Skill Tracker</div>
        <input
          type="text"
          placeholder="enter skill name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="pl-1 rounded"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => {
            if (canCreate) {
              setCanCreate(false);
              createSkill(name);
              setName('');
              setTimeout(() => {
                setCanCreate(true);
              }, 3000);
            }
          }}
        >
          {canCreate ? 'Create Skill' : 'Creating...'}
        </button>
        <div className="w-full flex justify-center gap-12 ">
          <div className="flex items-center">
            <FaArrowAltCircleLeft
              size={35}
              className={`${
                current !== 0 ? 'visible hover:opacity-30 ' : 'invisible'
              }`}
              onClick={() => (current != 0 ? setCurrent(current - 1) : null)}
            />
          </div>

          {skills[0] ? (
            <SkillCard
              skill={skills[current]}
              skillOperations={{
                deleteSkill,
                updateSkill,
                current,
                setCurrent,
              }}
            />
          ) : null}
          <div className="flex items-center">
            <FaArrowAltCircleRight
              size={35}
              className={`${
                current !== skills.length - 1 && skills.length !== 0
                  ? 'visible hover:opacity-30'
                  : 'invisible'
              }`}
              onClick={() =>
                current != skills.length - 1 ? setCurrent(current + 1) : null
              }
            />
          </div>
        </div>
        <div
          className={`${
            skills.length === 0
              ? 'invisible'
              : 'visible flex  items-center  gap-6 '
          }`}
        >
          <input
            type="number"
            placeholder={'0'}
            value={time}
            onChange={(e) => setTime(Number(e.target.value))}
            className="rounded w-1/2 text-black"
          />
          <div className={`${canStep ? 'opacity-100' : 'opacity-10'}`}>
            <FaPlusCircle
              className="hover:opacity-30"
              onClick={() => {
                if (canStep) {
                  setCanStep(false);
                  addStep(skills[current]._id, time),
                    setTimeout(() => {
                      setCanStep(true);
                    }, 3000);
                }
              }}
              size={35}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
