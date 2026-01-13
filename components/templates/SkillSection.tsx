import SkillList from '../organisms/SkillList';

const SkillSection = () => {
  return (
    <div className='grid w-full grid-cols-1 gap-5 lg:grid-cols-2'>
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
