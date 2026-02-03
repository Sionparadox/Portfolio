import Image from 'next/image';

const HeroSection = () => {
  return (
    <div className='sticky top-0 z-50 h-screen w-full backdrop-blur-sm'>
      <Image
        src='/macbook.png'
        alt='Hero'
        fill
        className='object-cover'
        priority
      />
    </div>
  );
};

export default HeroSection;
