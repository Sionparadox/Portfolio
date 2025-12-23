import Image from 'next/image';

const SquareProfileImage = () => {
  return (
    <div className='group/spi relative h-112 w-84'>
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
  );
};

export default SquareProfileImage;
