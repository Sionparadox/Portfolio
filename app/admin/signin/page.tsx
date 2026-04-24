import { signIn } from '@/auth';
import { Button } from '@/components/atoms/Button';
import Container from '@/components/atoms/Container';
import AccentTitle from '@/components/molecules/AccentTitle';
import SignInButton from '@/components/molecules/SignInButton';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Admin Login',
  description: '관리자 로그인 페이지 입니다.',
};
const AdminSignInPage = () => {
  return (
    <Container className='flex grow flex-col items-center justify-center gap-8 text-center'>
      <AccentTitle
        text='Admin'
        accentText='Login'
        description='관리자만 접근 가능한 페이지입니다.'
      />

      <form
        action={async () => {
          'use server';
          await signIn('github', { redirectTo: '/admin' });
        }}
        className='flex w-full max-w-md flex-col justify-center gap-2 sm:flex-row'
      >
        <SignInButton />
        <Button asChild className='flex-1'>
          <Link href='/'>메인으로 돌아가기</Link>
        </Button>
      </form>
    </Container>
  );
};

export default AdminSignInPage;
