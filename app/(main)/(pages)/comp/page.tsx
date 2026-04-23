import Container from '@/components/atoms/Container';
import ThemeToggleButton from '@/components/molecules/ThemeToggleButton';

const Page = () => {
  return (
    <Container className='flex flex-col items-center justify-center gap-12 text-center'>
      <div className='flex items-center justify-center pt-20 text-4xl'>
        <ThemeToggleButton />
      </div>
    </Container>
  );
};

export default Page;
