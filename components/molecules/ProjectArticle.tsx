import { ReactNode, useMemo } from 'react';
import AccentTitle from './AccentTitle';

type ProjectArticleProps = {
  title: string;
  description: ReactNode;
};

const ProjectArticle = ({ title, description }: ProjectArticleProps) => {
  const { text, accentText } = useMemo(() => {
    const words = title.split(' ');
    const accent = words.pop();
    return { text: words.join(' '), accentText: accent };
  }, [title]);
  return (
    <div className='space-y-2'>
      <AccentTitle
        as='h2'
        text={text}
        accentText={accentText}
        color='neon'
        underline
      />
      <div className='leading-relaxed break-keep'>{description}</div>
    </div>
  );
};

export default ProjectArticle;
