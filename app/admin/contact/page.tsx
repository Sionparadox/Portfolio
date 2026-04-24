import { getContacts } from '@/actions/contact';
import { Button } from '@/components/atoms/Button';
import Container from '@/components/atoms/Container';
import AccentTitle from '@/components/molecules/AccentTitle';
import AdminContactList from '@/components/organisms/AdminContactList';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const AdminContactPage = async () => {
  const result = await getContacts();
  const contacts = result.success && result.data ? result.data : [];

  return (
    <Container className='space-y-2'>
      <div className='border-b pt-8 pb-4'>
        <AccentTitle
          text='Contact'
          accentText='Management'
          description='연락 목록을 확인할 수 있습니다.'
        />
      </div>
      <Button variant='plain' asChild>
        <Link href='/admin'>
          <ArrowLeft />
          대시보드로 돌아가기
        </Link>
      </Button>
      <AdminContactList contacts={contacts} />
    </Container>
  );
};

export default AdminContactPage;
