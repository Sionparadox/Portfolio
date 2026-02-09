import {
  greetingMessage,
  greetingMessageType,
} from '@/constants/greetingMessage';
import Container from '../atoms/Container';
import { ExplosionText } from '../molecules/ExplosionText';
import ScrollDownArrow from '../molecules/ScrollDownArrow';
import ThemePlanet from '../molecules/ThemePlanet';

type HeroProps = {
  visitType: greetingMessageType;
  onReplayIntro?: () => void;
};

export const Hero = ({ visitType, onReplayIntro }: HeroProps) => {
  return (
    <div className='relative h-lvh overflow-x-hidden overflow-y-clip'>
      <ThemePlanet />
      <Container className='mb-4 flex h-full flex-col justify-end gap-4 pb-28'>
        <ExplosionText
          text={greetingMessage[visitType].title}
          className='text-fluid-h1'
        />
        <ExplosionText
          text={greetingMessage[visitType].message}
          className='-tracking-widest sm:tracking-normal'
        />
      </Container>
      <div className='absolute top-[100lvh] left-0 px-1 whitespace-nowrap sm:px-2 md:px-4 lg:px-6'>
        <ExplosionText text='I want to see you again in my portfolio' />
      </div>
      <ScrollDownArrow onReplayIntro={onReplayIntro} />
    </div>
  );
};
