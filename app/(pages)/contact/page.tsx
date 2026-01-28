import Container from '@/components/atoms/Container';
import AccentTitle from '@/components/molecules/AccentTitle';
import ContactCard from '@/components/molecules/ContactCard';
import ContactForm from '@/components/molecules/Contactform';
import ListGroup from '@/components/molecules/ListGroup';
import { CONTACT_INFO, SOCIAL_LINKS } from '@/constants/contactInfo';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: '개발자에게 직접 연락해보세요!',
};

const ContactPage = () => {
  return (
    <Container className='flex flex-col items-center justify-center gap-8 text-center sm:grow'>
      <AccentTitle
        text='Get in'
        accentText='Touch!'
        className='sm:pt-8'
        description='자유롭게 메시지를 남겨주세요.'
      />
      <div className='flex w-full flex-col items-stretch justify-center gap-8 sm:grow sm:flex-row'>
        <div className='flex w-full flex-col gap-8 sm:gap-6'>
          <ListGroup.Wrapper>
            <ListGroup.Title className='gradient-neon-text bg-clip-text text-transparent'>
              Contact Me!
            </ListGroup.Title>
            <ListGroup.Content>
              {CONTACT_INFO.map((contact) => {
                const Icon = contact.icon;
                return (
                  <ContactCard
                    key={contact.label}
                    icon={<Icon />}
                    label={contact.label}
                    link={contact.link}
                  />
                );
              })}
            </ListGroup.Content>
          </ListGroup.Wrapper>
          <ListGroup.Wrapper>
            <ListGroup.Title className='gradient-neon-text bg-clip-text text-transparent'>
              Follow Me!
            </ListGroup.Title>
            <ListGroup.Content>
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <ContactCard
                    key={social.label}
                    icon={<Icon size={social.iconSize} />}
                    label={social.label}
                    link={social.link}
                  />
                );
              })}
            </ListGroup.Content>
          </ListGroup.Wrapper>
        </div>

        <ContactForm className='w-full rounded-2xl p-4' />
      </div>
    </Container>
  );
};

export default ContactPage;
