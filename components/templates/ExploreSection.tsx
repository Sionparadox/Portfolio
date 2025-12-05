import { FaHome, FaUser } from 'react-icons/fa';
import { FaEnvelope, FaFileCode } from 'react-icons/fa6';
import Container from '../atoms/Container';
import ExploreCard from '../molecules/ExploreCard';

const ExploreSection = () => {
  return (
    <Container
      className='mb-24 flex flex-col items-center justify-center gap-16'
      yPadding='loose'
    >
      <div className='flex flex-col items-center justify-center gap-8 text-center'>
        <h1 className='text-3xl font-bold md:text-6xl'>Explore My Space!</h1>
        <p className='text-muted-foreground leading-relaxed'>
          제가 성장하는 여정에 오신 것을 환영합니다. 이 작은 공간이 우리를
          연결하는 다리가 되길 바라며, 언젠가 좋은 인연으로 다시 만나뵙기를
          기대합니다.
        </p>
      </div>
      <div className='mx-auto grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:w-fit lg:grid-cols-4'>
        <ExploreCard
          title='Home'
          description='홈스윗홈'
          icon={<FaHome />}
          link='/'
        />
        <ExploreCard
          title='About'
          description='어바웃타임'
          icon={<FaUser />}
          link='/about'
        />
        <ExploreCard
          title='Projects'
          description='프로젝트랄랄레로트랄랄라 프로젝트랄랄레로트랄랄라 프로젝트랄랄레로트랄랄라 프로젝트랄랄레로트랄랄라 프로젝트랄랄레로트랄랄라'
          icon={<FaFileCode />}
          link='/projects'
        />
        <ExploreCard
          title='Contact'
          description='연락해~'
          icon={<FaEnvelope />}
          link='/contact'
        />
      </div>
    </Container>
  );
};

export default ExploreSection;
