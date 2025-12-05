import Link from 'next/link';

interface ExploreCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}
const ExploreCard = ({ title, description, icon, link }: ExploreCardProps) => {
  return (
    <Link href={link} className='h-full w-full lg:max-w-64'>
      <div className='border-input flex h-full w-full items-center gap-4 rounded-2xl border p-4 sm:flex-col sm:items-center sm:gap-6 sm:p-6 lg:min-h-64'>
        <div className='border-input flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border [&_svg]:h-6 [&_svg]:w-6'>
          {icon}
        </div>
        <div className='flex flex-col gap-2 sm:items-center sm:text-center'>
          <h3 className='text-lg font-bold'>{title}</h3>
          <p className='text-muted-foreground text-sm'>{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default ExploreCard;
