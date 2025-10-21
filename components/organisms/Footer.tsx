import ContactLinks from '../molecules/ContactLinks';

const Footer = () => {
  return (
    <footer className='py-4'>
      <div className='flex items-center justify-between px-4'>
        <p className='text-center text-sm'>
          &copy; {new Date().getFullYear()} Sion. All rights reserved.
        </p>
        <ContactLinks className='hidden sm:flex' />
      </div>
    </footer>
  );
};

export default Footer;
