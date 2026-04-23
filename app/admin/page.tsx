import { auth, signOut } from '@/auth';
import { Button } from '@/components/atoms/Button';
import Container from '@/components/atoms/Container';
import AccentTitle from '@/components/molecules/AccentTitle';
import Link from 'next/link';

//TODO : 페이지 구현(현재 임시페이지)
const AdminPage = async () => {
  const session = await auth();
  return (
    <Container className='flex flex-col items-center gap-8 text-center sm:grow'>
      <AccentTitle
        text='Admin'
        accentText='Dashboard'
        className='pt-8'
        description={`환영합니다 ${session?.user?.name}님.`}
      />
      <form
        action={async () => {
          'use server';
          await signOut({ redirectTo: '/admin/signin' });
        }}
      >
        <Button type='submit' variant='destructive'>
          로그아웃
        </Button>
      </form>
      <div className='border-border flex w-full flex-col items-center gap-2 border-2'>
        <Button asChild>
          <Link href='/admin/contact'>연락 확인하기</Link>
        </Button>
        <Button asChild>
          <Link href='/admin/projects'>프로젝트 관리</Link>
        </Button>
        <Button asChild>
          <Link href='/admin/timeline'>타임라인 관리</Link>
        </Button>
      </div>
    </Container>
  );
};

export default AdminPage;
