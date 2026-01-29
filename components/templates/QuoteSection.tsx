import quoteData from '@/constants/quoteData';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa6';

const getRandomQuote = () => {
  return quoteData[Math.floor(Math.random() * quoteData.length)];
};

const QuoteSection = () => {
  const randomQuote = getRandomQuote();

  return (
    <div className='relative flex w-full flex-col gap-2 rounded-xl p-4'>
      <div className='gradient-neon-invert absolute inset-0 -z-10 rounded-xl opacity-30 blur-xl' />
      <blockquote className='flex items-center justify-center gap-2 text-xl font-semibold italic md:text-3xl'>
        <FaQuoteLeft className='size-7 shrink-0' aria-hidden='true' />
        <span className='gradient-neon-text bg-clip-text px-1 text-transparent'>
          {randomQuote.quote}
        </span>
        <FaQuoteRight className='size-7 shrink-0' aria-hidden='true' />
      </blockquote>
      <cite className='text-foreground w-full text-center text-sm font-semibold not-italic'>
        - {randomQuote.author}
      </cite>
    </div>
  );
};

export default QuoteSection;
