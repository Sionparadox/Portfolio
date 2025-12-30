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
      <div className='text-card-foreground group-hover/card:text-primary rounded-lg transition-all duration-300 group-hover/card:scale-110'>
        {icon}
      </div>
      <Button
        variant='link'
        asChild
        className='group-hover/card:text-primary transition-all duration-300'
      >
        <Link href={link ?? '/'} target='_blank' scroll={undefined}>
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
