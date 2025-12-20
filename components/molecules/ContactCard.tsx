import Link from 'next/link';
import { Button } from '../atoms/Button';
import CopyButton from './CopyButton';

type ContactCardProps = {
  icon: React.ReactNode;
  label: string;
  link?: string;
};
const ContactCard = ({ icon, label, link }: ContactCardProps) => {
  return (
    <div className='group/card relative flex items-center gap-8 p-2'>
      <div className='text-primary rounded-lg'>{icon}</div>
      <Button variant='link' asChild>
        <Link href={link ?? '/'} target='_blank'>
          {label}
        </Link>
      </Button>
      <div className='absolute top-0 right-0 hidden group-hover/card:block'>
        <CopyButton text={link ?? ''} />
      </div>
    </div>
  );
};

export default ContactCard;
