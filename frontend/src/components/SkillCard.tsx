import { SkillIf, SkillFunctionsIf } from '../interface/IF';
import { formatDate } from '../util/helper';
import { useState, useEffect } from 'react';
import { IoIosStar } from 'react-icons/io';
import { findRankColor } from '../constants/rank';
import { TiDelete } from 'react-icons/ti';
import { IoMdTime } from 'react-icons/io';
import { FaCloudscale, FaFire } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip';
interface SkillComponentProps {
  skill: SkillIf;
  skillOperations: SkillFunctionsIf;
}

const SkillCard: React.FC<SkillComponentProps> = ({
  skill,
  skillOperations,
}) => {
  const [date, setDate] = useState<String>('');

  useEffect(() => {
    setDate(formatDate(skill.created!));
  }, []);

  const formatRank = (name: string) => {
    return name.slice(0, -2) + ' ' + name.slice(-1);
  };
  return (
    <div className="flex relative w-1/4  flex-col text-center  text-white   p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 items-center">
      <TiDelete
        className="absolute  top-0 right-0 hover:text-red-500"
        onClick={() => {
          skillOperations.deleteSkill(skill._id);
          skillOperations.current !== 0
            ? skillOperations.setCurrent(skillOperations.current - 1)
            : null;
        }}
        size={35}
      />
      <section className="flex flex-col justify-center items-center h-80">
        <h5 className="mb-10 text-2xl font-bold tracking-tight  h-28 ">
          {skill.name}
        </h5>
        <div className="rounded-full  w-36 h-36 flex items-center justify-center flex-col">
          <IoIosStar size={60} color={findRankColor(skill.rank.name)!} />
          {skill.rank.name === 'none' ? 'none' : formatRank(skill.rank.name)}
        </div>
      </section>
      <section className="h-48 flex flex-col justify-end  w-full">
        <div className="flex flex-row  item-end justify-between   items-center ">
          <div className="flex flex-col justify-center items-center  w-1/3 gap-2">
            <IoMdTime size={24} />
            {skill.total_time}
          </div>
          <div className="rounded-full h-24 w-24   items-center justify-center flex flex-col bg-red-500 ">
            <FaFire size={24} className="text-white" />
            {skill.streak}
          </div>
          <div
            className="flex flex-col justify-center items-center w-1/3 gap-2"
            aria-label="skill level"
          >
            <FaCloudscale size={24} data-tip="Skill level" />

            {skill.skill_level}
          </div>
        </div>

        <div className="mt-4">created at: {date}</div>
      </section>
    </div>
  );
};

export default SkillCard;
