import api from '../services/api';
import { SkillIf } from '../interface/IF';
import { useState, useEffect } from 'react';

const useSkill = () => {
  const [skills, setSkills] = useState<SkillIf[]>([]);

  const getSkills = async () => {
    api
      .get('/')
      .then((res) => {
        console.log('data', res.data);
        setSkills(res.data);
        console.log('data', res.data);
      })
      .catch((err) => console.log(err));
  };

  const createSkill = async () => {
    api.post('/', { name: 'skilling' }).then((res) => {
      if (res.status === 201) {
        console.log('succedded');
      }
    });
  };
  useEffect(() => {
    getSkills();
  }, []);

  return {
    skills,
    getSkills,
    createSkill,
  };
};

export default useSkill;
