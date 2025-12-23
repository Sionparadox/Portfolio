import Container from '@/components/atoms/Container';
import Image from 'next/image';

const Page = () => {
  return (
    <Container className='flex flex-col items-center justify-center gap-8 text-center'>
      <div className='group/spi relative h-96 w-72'>
        <div className='relative z-10 h-full w-full overflow-hidden'>
          <Image
            src='/img/SquareImg.png'
            alt='My Profile Image'
            className='transition-all duration-300 group-hover/spi:scale-105'
            fill
          />
        </div>
        <div className='bg-primary/50 absolute inset-0 rotate-6 rounded-2xl blur-sm transition-all duration-300 group-hover/spi:scale-110 group-hover/spi:rotate-0 group-hover/spi:blur-none'></div>
      </div>
      <div className='group/spi relative h-96 w-72'>
        <div className='group-hover/spi:border-primary relative z-10 h-full w-full overflow-hidden rounded-2xl bg-white transition-all duration-300 group-hover/spi:border-2'>
          <Image
            src='/img/SquareImg.png'
            alt='My Profile Image'
            className='transition-all duration-300 group-hover/spi:scale-105'
            fill
          />
        </div>
        <div className='bg-primary/50 absolute inset-0 top-2 -right-4 -bottom-2 left-4 rounded-2xl transition-all duration-300 group-hover/spi:top-0 group-hover/spi:right-0 group-hover/spi:bottom-0 group-hover/spi:left-0'></div>
      </div>
    </Container>
  );
};

export default Page;
