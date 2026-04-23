import Container from '@/components/atoms/Container';
import AccentTitle from '@/components/molecules/AccentTitle';
import ContactSection from '@/components/templates/ContactSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: '개발자에게 직접 연락해보세요!',
};

const ContactPage = () => {
  return (
    <Container className='flex flex-col items-center justify-center gap-8 text-center sm:grow'>
      <AccentTitle
        text='Get in'
        accentText='Touch!'
        className='sm:pt-8'
        description='자유롭게 메시지를 남겨주세요.'
      />
      <ContactSection />
    </Container>
  );
};

export default ContactPage;
