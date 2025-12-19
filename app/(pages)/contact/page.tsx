import Container from '@/components/atoms/Container';
import GradientText from '@/components/atoms/GradientText';
import ContactCard from '@/components/molecules/ContactCard';
import ContactForm from '@/components/molecules/Contactform';
import ListGroup from '@/components/molecules/ListGroup';
import { Mail, MapPin, Phone } from 'lucide-react';
import { FaBlog, FaGithub } from 'react-icons/fa6';

const ContactPage = () => {
  return (
    <Container className='flex flex-col items-center justify-center gap-8 text-center sm:grow'>
      <div>
        <h1 className='text-foreground text-3xl font-black sm:pt-8 md:text-5xl'>
          Get in <GradientText degree={45}>Touch!</GradientText>
        </h1>
        <p className='text-muted-foreground mt-2 text-lg leading-relaxed'>
          자유롭게 메시지를 남겨주세요.
        </p>
      </div>
      <div className='flex w-full flex-col items-stretch justify-center gap-8 sm:grow sm:flex-row'>
        <div className='flex w-full flex-col gap-6 p-4'>
          <ListGroup.Wrapper>
            <ListGroup.Title>Contact Me!</ListGroup.Title>
            <ListGroup.Content>
              <ContactCard
                icon={<Phone />}
                label='010-4193-0547'
                link='tel:01041930547'
              />
              <ContactCard
                icon={<Mail />}
                label='sions.dev@gmail.com'
                link='mailto:sions.dev@gmail.com'
              />
              <ContactCard
                icon={<MapPin />}
                label='인천광역시, 대한민국'
                link='https://www.google.com/maps/place/%EC%9D%B8%EC%B2%9C%EA%B4%91%EC%97%AD%EC%8B%9C+%EB%82%A8%EB%8F%99%EA%B5%AC+%EB%82%A8%EB%8F%99%EB%8C%80%EB%A1%9C799%EB%B2%88%EA%B8%B8+34/data=!3m1!4b1!4m6!3m5!1s0x357b7be7d56d96ad:0xdef4edd58d17af53!8m2!3d37.4542639!4d126.7071056!16s%2Fg%2F11bz58qrt_?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D'
              />
            </ListGroup.Content>
          </ListGroup.Wrapper>
          <ListGroup.Wrapper>
            <ListGroup.Title>Follow me!</ListGroup.Title>
            <ListGroup.Content>
              <ContactCard
                icon={<FaGithub size={24} />}
                label='깃허브'
                link='https://github.com/Sionparadox'
              />
              <ContactCard
                icon={<FaBlog size={24} />}
                label='블로그'
                link='https://sionparadox.github.io'
              />
            </ListGroup.Content>
          </ListGroup.Wrapper>
        </div>
        <ContactForm className='w-full rounded-2xl p-4' />
      </div>
    </Container>
  );
};

export default ContactPage;
