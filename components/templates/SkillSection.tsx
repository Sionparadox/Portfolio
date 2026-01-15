import AccentTitle from '../molecules/AccentTitle';
import SkillList from '../organisms/SkillList';

const SkillSection = () => {
  return (
    <div className='flex w-full flex-col items-center justify-center gap-8'>
      <AccentTitle
        as='h2'
        text='What I'
        accentText='Build'
        text2='with'
        color='neon'
        underline
      />
      <div className='grid w-full grid-cols-1 gap-5 lg:grid-cols-2'>
        <SkillList category='languages' />
        <SkillList category='frontend' />
        <SkillList category='backend' />
        <SkillList category='database' />
        <SkillList category='devops' />
        <SkillList category='others' />
      </div>
    </div>
  );
};

export default SkillSection;
