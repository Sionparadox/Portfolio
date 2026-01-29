import { getTimelines } from '@/actions/timeline';
import AccentTitle from '../molecules/AccentTitle';
import ExperienceClient from '../organisms/ExperienceClient';

const ExperienceSection = async () => {
  const result = await getTimelines();
  const timelineData = result.success && result.data ? result.data : [];

  return (
    <div className='flex w-full flex-col items-center justify-center pt-4'>
      <AccentTitle
        as='h2'
        text='How I'
        accentText='Grew'
        text2='Up'
        color='neon'
        underline
        className='mb-8'
      />
      <ExperienceClient timelineData={timelineData} />
    </div>
  );
};

export default ExperienceSection;
