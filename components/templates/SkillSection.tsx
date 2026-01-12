import SkillList from '../organisms/SkillList';

const SkillSection = () => {
  return (
    <div className='flex w-full flex-col items-center justify-center gap-8 pt-4'>
      <SkillList category='languages' />
      <SkillList category='frontend' />
      <SkillList category='backend' />
      <SkillList category='database' />
      <SkillList category='devops' />
      <SkillList category='others' />
    </div>
  );
};

export default SkillSection;
