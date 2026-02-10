import { SkillCategoryType } from '../../types/skillType';
import AccentTitle from '../molecules/AccentTitle';
import SkillList from '../organisms/SkillList';
import { StaggerWrapper, StaggerItem } from '../organisms/StaggerWrapper';

const CATEGORIES: SkillCategoryType[] = [
  'languages',
  'frontend',
  'backend',
  'database',
  'devops',
  'others',
];

const SkillSection = () => {
  return (
    <section className='flex w-full flex-col items-center justify-center gap-8'>
      <AccentTitle
        as='h2'
        text='What I'
        accentText='Build'
        text2='with'
        color='neon'
        underline
      />

      <StaggerWrapper className='grid w-full grid-cols-1 gap-5 lg:grid-cols-2'>
        {CATEGORIES.map((category) => (
          <StaggerItem key={category}>
            <SkillList category={category} />
          </StaggerItem>
        ))}
      </StaggerWrapper>
    </section>
  );
};

export default SkillSection;
