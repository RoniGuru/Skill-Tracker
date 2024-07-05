import { useState, useEffect } from 'react';
import useSkill from './hook/skillHook';
import SkillCard from './components/SkillCard';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';

function App() {
  const { skills, createSkill, getSkills, deleteSkill, addStep, updateSkill } =
    useSkill();

  const [current, setCurrent] = useState<number>(0);
  const [name, setName] = useState<string>('');
  useEffect(() => {
    getSkills();
  }, []);

  return (
    <>
      <div className="  w-screen h-screen bg-red-500 text-center flex flex-col items-center gap-4 ">
        <div className="text-3xl font-bold underline">app</div>
        <input
          type="text"
          placeholder="enter skill name"
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={() => createSkill(name)}>create skill</button>
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

        <button
          className={`${skills.length === 0 ? 'invisible' : 'visible mt-4'}`}
          onClick={() => addStep(skills[current]._id, 25)}
        >
          add Step
        </button>
      </div>
    </>
  );
}

export default App;
