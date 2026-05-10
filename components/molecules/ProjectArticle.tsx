import { ReactNode, useMemo } from 'react';
import AccentTitle from './AccentTitle';

type ProjectArticleProps = {
  title: string;
  description: ReactNode;
  sectionLabel?: string;
};

const ProjectArticle = ({
  title,
  description,
  sectionLabel,
}: ProjectArticleProps) => {
  const { text, accentText } = useMemo(() => {
    const words = title.split(' ');
    const accent = words.pop();
    return { text: words.join(' '), accentText: accent };
  }, [title]);

  return (
    <article className='group border-border/70 bg-card/50 relative rounded-2xl border px-5 py-6 sm:px-7 sm:py-7'>
      <div className='pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan-500/70 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100' />
      <div className='mb-4 flex items-center gap-3 sm:mb-5'>
        <span className='text-muted-foreground text-[0.65rem] font-semibold tracking-[0.24em] uppercase'>
          {sectionLabel ?? 'PROJECT NOTE'}
        </span>
        <div className='h-px flex-1 bg-linear-to-r from-cyan-500/60 via-purple-500/50 to-transparent' />
      </div>

      <AccentTitle
        as='h2'
        text={text}
        accentText={accentText}
        color='neon'
        className='w-full'
      />

      <div className="text-foreground/90 mt-4 leading-7 break-keep sm:text-[1.03rem] [&_li]:relative [&_li]:pl-4 [&_li]:leading-7 [&_li]:before:absolute [&_li]:before:top-[0.62rem] [&_li]:before:left-0 [&_li]:before:size-1.5 [&_li]:before:rounded-full [&_li]:before:bg-linear-to-r [&_li]:before:from-cyan-500 [&_li]:before:to-purple-500 [&_li]:before:content-[''] [&_ul]:list-none [&_ul]:space-y-2">
        {description}
      </div>
    </article>
  );
};

export default ProjectArticle;
