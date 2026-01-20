import AccentTitle from './AccentTitle';

type ProjectArticleProps = {
  title: string;
  description: string;
};

const ProjectArticle = ({ title, description }: ProjectArticleProps) => {
  const words = title.split(' ');
  const accentText = words.pop();
  const text = words.join(' ');
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
