import { SkillIf, SkillFunctionsIf } from '../interface/IF';
import { formatDate } from '../util/helper';
import { useState, useEffect } from 'react';

interface SkillComponentProps {
  skill: SkillIf;
  skillOperations: SkillFunctionsIf;
}

const SkillCard: React.FC<SkillComponentProps> = ({
  skill,
  skillOperations,
}) => {
  const [date, setDate] = useState('');

  useEffect(() => {
    setDate(formatDate(skill.created!));
  }, []);

  return (
    <div className="flex relative w-1/4  flex-col text-center text-gray-700 dark:text-gray-400  p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 items-center">
      <button
        className="absolute  top-0 right-0"
        onClick={() => {
          skillOperations.deleteSkill(skill._id);
          skillOperations.current !== 0
            ? skillOperations.setCurrent(skillOperations.current - 1)
            : null;
        }}
      >
        delete skill
      </button>
      <section className="flex flex-col justify-center items-center h-80">
        <h5 className="mb-10 text-2xl font-bold tracking-tight text-gray-900 dark:text-white h-28 ">
          {skill.name}
        </h5>
        <div className="rounded-full bg-slate-300 w-36 h-36 flex items-center justify-center ">
          rank : {skill.rank.name}
        </div>
      </section>
      <section className="h-48 flex flex-col justify-end  w-full">
        <div className="flex flex-row  item-end justify-between  bg-purple-300 items-center ">
          <div>total time :{skill.total_time}</div>
          <div className="rounded-full h-24 w-24 bg-slate-300  flex items-center justify-center">
            streak :{skill.streak}
          </div>
          <div>skill level :{skill.skill_level}</div>
        </div>

        <div className="mt-2">created at: {date}</div>
      </section>
    </div>
  );
};

export default SkillCard;
