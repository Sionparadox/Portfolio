import { Button } from '@/components/atoms/Button';
import Container from '@/components/atoms/Container';
import LabelInput from '@/components/molecules/LabelInput';

const ContactPage = () => {
  return (
    <Container className='flex grow flex-col items-center justify-center gap-8 text-center'>
      <div>
        <p className='text-foreground text-3xl font-black md:text-5xl'>
          Get in Touch!
        </p>
        <p className='text-muted-foreground text-lg leading-relaxed'>
          자유롭게 메시지를 남겨주세요.
        </p>
      </div>
      <div className='flex w-full flex-col items-stretch justify-center gap-8 sm:grow sm:flex-row'>
        <div className='w-full rounded-2xl border p-4'>카드1</div>
        <form className='flex w-full flex-col justify-between gap-4 rounded-2xl border p-4'>
          <LabelInput label='이름' />
          <LabelInput label='이메일' />
          <LabelInput
            label='메시지'
            multiline
            wrapperClassName='grow'
            className='h-full'
          />
          {/* <div className='grow bg-red-500'></div> */}
          <Button type='submit' className='w-full'>
            전송
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default ContactPage;
