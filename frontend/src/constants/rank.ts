interface rankConstantIf {
  name: string;
  color: string;
}

export const rankColors: rankConstantIf[] = [
  { name: 'Beginner_1', color: '#FFD700' },
  { name: 'Beginner_2', color: '#FFA500' },
  { name: 'Beginner_3', color: '#FF8C00' },
  { name: 'Beginner_4', color: '#FF7F50' },
  { name: 'Beginner_5', color: '#CD853F' },

  { name: 'Intermediate_1', color: '#C0C0C0' },
  { name: 'Intermediate_2', color: '#A9A9A9' },
  { name: 'Intermediate_3', color: '#808080' },
  { name: 'Intermediate_4', color: '#696969' },
  { name: 'Intermediate_5', color: '#778899' },

  { name: 'Proficient_1', color: '#FFD700' },
  { name: 'Proficient_2', color: '#FFC700' },
  { name: 'Proficient_3', color: '#FFB700' },
  { name: 'Proficient_4', color: '#FFA700' },
  { name: 'Proficient_5', color: '#FF9700' },

  { name: 'Advanced_1', color: '#E5E4E2' },
  { name: 'Advanced_2', color: '#D3D3D3' },
  { name: 'Advanced_3', color: '#B0B0B0' },
  { name: 'Advanced_4', color: '#999999' },
  { name: 'Advanced_5', color: '#808080' },

  { name: 'Expert_1', color: '#B9F2FF' },
  { name: 'Expert_2', color: '#AFE4FF' },
  { name: 'Expert_3', color: '#A5D6FF' },
  { name: 'Expert_4', color: '#9BC8FF' },
  { name: 'Expert_5', color: '#91BAFF' },

  { name: 'Master_1', color: '#FF0000' },
  { name: 'Master_2', color: '#E60000' },
  { name: 'Master_3', color: '#CC0000' },
  { name: 'Master_4', color: '#B30000' },
  { name: 'Master_5', color: '#990000' },
];

export const findRankColor = (rankName: string) => {
  const rank = rankColors.find((rank) => rank.name === rankName);
  return rank ? rank.color : null;
};
