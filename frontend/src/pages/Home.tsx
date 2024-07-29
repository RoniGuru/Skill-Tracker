import { useState, useEffect } from 'react';
import useSkill from '../hook/skillHook';
import SkillCard from '../components/SkillCard';
import {
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
  FaPlusCircle,
} from 'react-icons/fa';
import Timer from '../components/Timer';

function Home() {
  const { skills, createSkill, getSkills, deleteSkill, addStep, updateSkill } =
    useSkill();

  const [current, setCurrent] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const [time, setTime] = useState<number>(0);

  const [canCreate, setCanCreate] = useState<Boolean>(true);

  useEffect(() => {
    getSkills();
  }, []);

  return (
    <>
      <div className="  w-screen h-screen bg-red-500 text-center flex flex-col items-center gap-4 text-white ">
        <div className="text-3xl font-bold underline ">Skill Tracker</div>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="enter skill name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="pl-1 rounded text-black"
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
            aria-label="Add Skill Button"
          >
            {canCreate ? 'Create Skill' : 'Creating...'}
          </button>
        </div>

        <div className="w-full flex justify-center gap-12 ">
          <div className="flex items-center">
            <FaArrowAltCircleLeft
              size={35}
              className={`${
                current !== 0 ? 'visible hover:opacity-30 ' : 'invisible'
              }`}
              onClick={() => (current != 0 ? setCurrent(current - 1) : null)}
              aria-label="left skill slider Button"
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
              aria-label="right skill slider Button"
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
          <Timer skill={skills[current]} addStep={addStep} />
        </div>
      </div>
    </>
  );
}

export default Home;
