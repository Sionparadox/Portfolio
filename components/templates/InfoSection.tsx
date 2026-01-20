import { profile } from '@/constants/profile';
import { ArrowRight, Download, MessageSquare } from 'lucide-react';
import Container from '../atoms/Container';
import LinkIconButton from '../molecules/LinkIconButton';
import ProfileImage from '../molecules/ProfileImage';

const InfoSection = () => {
  return (
    <Container className='mb-16 flex min-h-[75vh] flex-col items-center justify-center gap-8 md:flex-row md:items-center md:gap-16 lg:gap-24'>
      <div className='w-64 shrink-0 sm:w-72 md:w-80 lg:w-96'>
        <ProfileImage
          src='/img/Sion.jpeg'
          alt='Sion Picture'
          width={480}
          height={480}
        />
      </div>

      <div className='my-auto flex w-full flex-col items-center gap-6 text-center md:items-start md:text-left'>
        <div className='w-full'>
          <h1 className='text-5xl font-bold lg:text-6xl'>{profile.name}</h1>
          <div className='gradient-primary mt-4 h-1 w-full' />
        </div>

        <h2 className='text-3xl font-bold lg:text-4xl'>{profile.title}</h2>

        <p className='text-muted-foreground leading-relaxed'>
          {profile.description}
        </p>

        <div className='flex flex-wrap justify-center gap-3 md:justify-start'>
          <LinkIconButton
            href={profile.links.about}
            icon={ArrowRight}
            className='w-36'
          >
            About Me
          </LinkIconButton>
          <LinkIconButton
            href={profile.links.contact}
            icon={MessageSquare}
            className='w-36'
          >
            Contact Me
          </LinkIconButton>
          <LinkIconButton
            href={profile.links.resume}
            icon={Download}
            className='w-36'
            download
          >
            Resume
          </LinkIconButton>
        </div>
      </div>
    </Container>
  );
};

export default InfoSection;
