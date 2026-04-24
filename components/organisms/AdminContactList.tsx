'use client';

import { deleteContact } from '@/actions/contact';
import { Contact } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import ContactInfoCard from '../molecules/ContactInfoCard';

const AdminContactList = ({ contacts }: { contacts: Contact[] }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleDelete = async (id: string) => {
    if (confirm('정말로 연락 정보를 삭제하시겠습니까?')) {
      startTransition(async () => {
        const result = await deleteContact(id);
        if (result.success) {
          router.refresh();
        } else {
          alert(`삭제 실패: ${result.message}`);
        }
      });
    }
  };
  return (
    <div className='space-y-2'>
      {contacts.map((contact) => (
        <ContactInfoCard
          key={contact.id}
          contact={contact}
          onDelete={handleDelete}
          isPending={isPending}
        />
      ))}
    </div>
  );
};

export default AdminContactList;
