import Container from '../atoms/Container';
import ContactLinks from '../molecules/ContactLinks';

const Footer = () => {
  return (
    <footer>
      <Container className='flex items-center justify-between' yPadding='tight'>
        <div className='flex min-h-11 flex-1 items-center justify-center text-sm sm:justify-start'>
          &copy; {new Date().getFullYear()} Sion. All rights reserved.
        </div>
        <ContactLinks className='hidden sm:flex' />
      </Container>
    </footer>
  );
};

export default Footer;
