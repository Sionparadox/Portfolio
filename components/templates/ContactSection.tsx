import { CONTACT_INFO, SOCIAL_LINKS } from '@/constants/contactInfo';
import ContactCard from '../molecules/ContactCard';
import ContactForm from '../molecules/Contactform';
import ListGroup from '../molecules/ListGroup';

const ContactSection = () => {
  return (
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
  );
};

export default ContactSection;
