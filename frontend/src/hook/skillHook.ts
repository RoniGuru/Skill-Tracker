import api from '../services/api';
import { SkillIf } from '../interface/IF';
import { useState, useEffect } from 'react';
import { Types } from 'mongoose';

const useSkill = () => {
  const [skills, setSkills] = useState<SkillIf[]>([]);

  const getSkills = async () => {
    api
      .get('/')
      .then((res) => {
        setSkills(res.data);
      })
      .catch((err) => console.log(err));
  };

  const createSkill = async (skillName: string) => {
    if (skillName === '') {
      return alert("skill name can't be empty");
    } else if (skillName.length > 20) {
      return alert("skill name can't be longer than 20 characters");
    }
    api
      .post('/', { name: skillName })
      .then((res) => {
        let updatedSkills = [...skills];
        updatedSkills.push(res.data);
        setSkills(updatedSkills);
      })
      .catch((err) => console.log(err));
  };

  const deleteSkill = async (id: Types.ObjectId) => {
    api.delete(`/${id}`).then(() => {
      const index = skills.findIndex((skill) => skill._id === id);
      if (index !== -1) {
        const updatedSkills = [...skills];
        updatedSkills.splice(index, 1);
        setSkills(updatedSkills);
      }
    });
  };

  const updateSkill = async (id: Types.ObjectId) => {};

  const addStep = async (id: Types.ObjectId, time: number) => {
    if (time === 0 || time > 2400) {
      return alert('invalid time');
    }
    api.post(`/${id}/steps`, { time: time }).then((res) => {
      const index = skills.findIndex((skill) => skill._id === id);
      if (index !== -1) {
        const updatedSkills = [...skills];
        updatedSkills[index] = res.data;
        setSkills(updatedSkills);
      }
    });
  };

  return {
    skills,
    getSkills,
    createSkill,
    deleteSkill,
    updateSkill,
    addStep,
  };
};

export default useSkill;
