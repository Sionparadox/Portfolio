import { exploreItems } from '@/constants/exploreData';
import Container from '../atoms/Container';
import AccentTitle from '../molecules/AccentTitle';
import ExploreCard from '../molecules/ExploreCard';

export const ExploreSection = () => {
  return (
    <Container className='mb-10 flex min-h-[75vh] flex-col items-center justify-center gap-16'>
      <div className='flex flex-col items-center justify-center gap-8 text-center'>
        <AccentTitle
          text='Explore My'
          accentText='Space!'
          color='neon'
          description='제가 성장하는 여정에 오신 것을 환영합니다. 이 작은 공간이 우리를
          연결하는 다리가 되길 바라며, 언젠가 좋은 인연으로 다시 만나뵙기를
          기대합니다.'
        />
      </div>
      <div className='mx-auto grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:w-fit lg:grid-cols-4'>
        {exploreItems.map((item) => (
          <ExploreCard key={item.link} {...item} />
        ))}
      </div>
    </Container>
  );
};

export default ExploreSection;
