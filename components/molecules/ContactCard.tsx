import Link from 'next/link';

type ContactCardProps = {
  icon: React.ReactNode;
  label: string;
  link?: string;
};
const ContactCard = ({ icon, label, link }: ContactCardProps) => {
  return (
    <div className='flex items-center gap-8 p-2'>
      <div className='text-primary rounded-lg'>{icon}</div>
      <Link href={link ?? '/'} target='_blank'>
        {label}
      </Link>
    </div>
  );
};

export default ContactCard;
