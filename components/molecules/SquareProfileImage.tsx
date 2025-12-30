import Image from 'next/image';

const SquareProfileImage = () => {
  return (
    <div className='group/spi relative h-112 w-84'>
      <div className='absolute inset-0 -z-1 bg-linear-to-br from-cyan-500 to-purple-500 blur-xl transition-all duration-600 group-hover/spi:blur-2xl' />

      <div className='gradient-neon-bg ease-bounce absolute inset-0 -top-2 -right-2 -bottom-2 -left-2 -z-10 rounded-2xl group-hover/spi:scale-x-132 group-hover/spi:scale-y-76 group-hover/spi:-rotate-90' />

      <div className='relative z-0 h-full w-full overflow-hidden rounded-2xl bg-white'>
        <Image
          src='/img/SquareImg.png'
          alt='My Profile Image'
          className='transition-all duration-300 group-hover/spi:scale-105'
          fill
        />
      </div>
    </div>
  );
};

export default SquareProfileImage;
