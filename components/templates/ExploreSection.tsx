import { exploreItems } from '@/constants/exploreData';
import Container from '../atoms/Container';
import ExploreCard from '../molecules/ExploreCard';

export const ExploreSection = () => {
  return (
    <Container className='mb-10 flex min-h-[75vh] flex-col items-center justify-center gap-16'>
      <div className='flex flex-col items-center justify-center gap-8 text-center'>
        <h1 className='text-foreground text-3xl font-bold md:text-5xl'>
          Explore My Space!
        </h1>
        <p className='text-muted-foreground text-lg leading-relaxed'>
          제가 성장하는 여정에 오신 것을 환영합니다. 이 작은 공간이 우리를
          연결하는 다리가 되길 바라며, 언젠가 좋은 인연으로 다시 만나뵙기를
          기대합니다.
        </p>
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
