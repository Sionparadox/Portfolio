import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa6';

const QuoteSection = () => {
  return (
    <div className='flex w-full items-center justify-center gap-2 rounded-xl p-4 text-3xl font-semibold italic'>
      <FaQuoteLeft />
      <span className='gradient-neon-text bg-clip-text text-transparent'>
        Done is better than perfect.
      </span>
      <FaQuoteRight />
    </div>
  );
};

export default QuoteSection;
