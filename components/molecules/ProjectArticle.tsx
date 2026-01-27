import { useMemo } from 'react';
import AccentTitle from './AccentTitle';

type ProjectArticleProps = {
  title: string;
  description: string;
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
      <p className='leading-relaxed break-keep'>{description}</p>
    </div>
  );
};

export default ProjectArticle;
