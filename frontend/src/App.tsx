import { useState, useEffect } from 'react';
import useSkill from './hook/skillHook';
import SkillCard from './components/SkillCard';
import { skillExample } from './interface/IF';

function App() {
  const { skills, createSkill } = useSkill();

  const [current, setCurrent] = useState<number>(0);
  const [name, setName] = useState<string>('');

  return (
    <>
      <div className="  w-screen h-screen bg-red-500 text-center flex flex-col items-center gap-4 ">
        <div className="text-3xl font-bold underline">app</div>
        <input type="text" />
        <button onClick={() => console.log(skills)}>create skill</button>
        <div className="w-full flex justify-center gap-12 ">
          <button
            onClick={() => (current != 0 ? setCurrent(current - 1) : null)}
          >
            last skill
          </button>

          {skills[0] ? <SkillCard skill={skills[current]} /> : null}

          <button
            onClick={() =>
              current != skillExample.length - 1
                ? setCurrent(current + 1)
                : null
            }
          >
            next skill
          </button>
        </div>

        {/* <button onClick={() => console.log(skills)}>click</button>
      <button onClick={() => createSkill()}>create</button>

      <div>
        {skills
          ? skills.map((skill, index) => (
              <SkillCard skill={skill} key={index} />
            ))
          : null}
      </div> */}

        <button className="mt-4">add Step</button>
      </div>
    </>
  );
}

export default App;
