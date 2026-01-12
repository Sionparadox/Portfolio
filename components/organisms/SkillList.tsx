import skillData from '@/constants/skillData';
import { SkillCategoryType } from '@/types/skillType';
import SkillCard from '../molecules/SkillCard';

const SkillList = ({ category }: { category: SkillCategoryType }) => {
  const skills = skillData[category];
  return (
    <div>
      <h3 className='text-start text-2xl font-bold capitalize'>{category}</h3>
      <div className='gradient-primary mb-3 h-0.5 w-1/3' />
      <div className='grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6'>
        {skills.map((skill) => (
          <SkillCard key={skill.name} {...skill} />
        ))}
      </div>
    </div>
  );
};

export default SkillList;
