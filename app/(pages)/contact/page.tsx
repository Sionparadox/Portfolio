import Container from '@/components/atoms/Container';
import ContactForm from '@/components/molecules/Contactform';

const ContactPage = () => {
  return (
    <Container className='flex flex-col items-center justify-center gap-8 text-center sm:grow'>
      <div>
        <p className='text-foreground text-3xl font-black sm:pt-8 md:text-5xl'>
          Get in Touch!
        </p>
        <p className='text-muted-foreground mt-2 text-lg leading-relaxed'>
          자유롭게 메시지를 남겨주세요.
        </p>
      </div>
      <div className='flex w-full flex-col items-stretch justify-center gap-8 sm:grow sm:flex-row'>
        <div className='w-full rounded-2xl border p-4'>카드1</div>
        <ContactForm className='flex w-full flex-col justify-between gap-4 rounded-2xl border p-4' />
      </div>
    </Container>
  );
};

export default ContactPage;
