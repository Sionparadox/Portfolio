import Container from '@/components/atoms/Container';
import AccentTitle from '@/components/molecules/AccentTitle';
import LinkIconButton from '@/components/molecules/LinkIconButton';
import SquareProfileImage from '@/components/molecules/SquareProfileImage';
import { MessageSquare, Download } from 'lucide-react';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa6';

const AboutPage = () => {
  return (
    <Container className='flex flex-col items-center justify-center gap-8 text-center'>
      <AccentTitle text='About' accentText='Me' className='sm:pt-6' />
      <div className='flex w-full justify-center gap-8'>
        <div className='shrink-0'>
          <SquareProfileImage />
        </div>
        <div className='flex h-full flex-col gap-4'>
          <div className='border-secondary flex flex-col gap-4 border-r-2 px-4 text-left leading-relaxed'>
            <p>
              Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
              faucibus ex sapien vitae pellentesque sem placerat. In id cursus
              mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
              urna tempor.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
              faucibus ex sapien vitae pellentesque sem placerat. In id cursus
              mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
              urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum
              egestas. Iaculis massa nisl malesuada lacinia integer nunc
              posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad
              litora torquent per conubia nostra inceptos himenaeos.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
              faucibus ex sapien vitae pellentesque sem placerat. In id cursus
              mi pretium tellus duis convallis.
            </p>
          </div>
          <div className='mt-4 flex flex-wrap justify-center gap-3 pl-4 md:justify-start'>
            <LinkIconButton
              href='/contact'
              icon={MessageSquare}
              className='w-36'
            >
              Contact Me
            </LinkIconButton>
            <LinkIconButton
              href='/resume.pdf'
              icon={Download}
              className='w-36'
              download
            >
              Resume
            </LinkIconButton>
          </div>
          <div className='flex w-full items-center justify-center gap-2 rounded-xl p-4 text-3xl font-semibold italic'>
            <FaQuoteLeft />
            <span className='from-primary via-secondary to-primary bg-linear-to-r bg-clip-text text-transparent'>
              Done is better than perfect.
            </span>
            <FaQuoteRight />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AboutPage;
