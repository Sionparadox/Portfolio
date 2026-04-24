import { Contact } from '@prisma/client';
import { Trash2 } from 'lucide-react';
import { Button } from '../atoms/Button';

interface ContactInfoCardProps {
  contact: Contact;
  onDelete: (id: string) => void;
  isPending: boolean;
}
const ContactInfoCard = ({
  contact,
  onDelete,
  isPending,
}: ContactInfoCardProps) => {
  return (
    <div className='border-border bg-background flex items-center justify-between rounded-lg border px-4'>
      <div className='flex flex-col gap-2 p-4'>
        <div className='flex items-center gap-2'>
          <p className='text-sm font-semibold'>{contact.name}</p>
          <p className='text-muted-foreground text-sm'>{contact.email}</p>
          <p className='text-muted-foreground text-sm'>
            {new Date(contact.createdAt).toLocaleDateString()}
          </p>
        </div>
        <p className='text-sm'>{contact.message}</p>
      </div>
      <Button
        variant='destructive'
        size='icon'
        onClick={() => onDelete(contact.id)}
        disabled={isPending}
      >
        <Trash2 />
      </Button>
    </div>
  );
};

export default ContactInfoCard;
