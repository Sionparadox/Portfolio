'use client';

import skillData from '@/constants/skillData';
import { SkillCategoryType } from '@/types/skillType';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../atoms/Button';
import SkillCard from '../molecules/SkillCard';

const SkillList = ({ category }: { category: SkillCategoryType }) => {
  const skills = skillData[category];
  const [allActive, setAllActive] = useState(false);

  const handleToggleAll = () => {
    setAllActive((prev) => !prev);
  };

  return (
    <div className='w-full'>
      <div className='flex flex-col gap-1'>
        <div className='flex w-48 items-center justify-between'>
          <h3 className='mb-0.5 text-start text-2xl font-bold capitalize'>
            {category}
          </h3>

          <Button
            className='hidden items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium transition-colors sm:inline-flex'
            variant={allActive ? 'inverted' : 'outline'}
            onClick={handleToggleAll}
            size='sm'
            aria-label={allActive ? '모두 숨기기' : '모두 보이기'}
          >
            {allActive ? <EyeOffIcon /> : <EyeIcon />}
          </Button>
        </div>

        <div className='gradient-primary mb-3 h-0.5 w-48' />
      </div>

      <div className='grid grid-cols-[repeat(auto-fit,128px)] justify-center gap-4 sm:justify-start'>
        {skills.map((skill) => (
          <SkillCard key={skill.name} {...skill} forceActive={allActive} />
        ))}
      </div>
    </div>
  );
};

export default SkillList;
