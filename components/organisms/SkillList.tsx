import skillData from '@/constants/skillData';
import { SkillCategoryType } from '@/types/skillType';
import SkillCard from '../molecules/SkillCard';

const SkillList = ({ category }: { category: SkillCategoryType }) => {
  const skills = skillData[category];
  return (
    <div className='w-full'>
      <div className='flex flex-col items-center sm:items-start'>
        <h3 className='mb-0.5 text-start text-2xl font-bold capitalize'>
          {category}
        </h3>
        <div className='gradient-primary mb-3 h-0.5 w-1/3' />
      </div>
      <div className='grid grid-cols-[repeat(auto-fit,128px)] justify-center gap-4 sm:justify-start'>
        {skills.map((skill) => (
          <SkillCard key={skill.name} {...skill} />
        ))}
      </div>
    </div>
  );
};

export default SkillList;
