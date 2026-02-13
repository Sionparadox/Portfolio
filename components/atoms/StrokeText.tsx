import { Fragment } from 'react';

const StrokeText = ({
  children,
  strokeWidth = 3,
}: {
  children: string;
  strokeWidth?: number;
}) => {
  const words = children.split(' ');
  return (
    <>
      {words.map((word, index) => (
        <Fragment key={index}>
          <span className='isolate inline-grid'>
            <span
              className='-z-10 col-start-1 row-start-1 font-semibold select-none'
              style={{
                WebkitTextStroke: `${strokeWidth}px var(--color-stroke)`,
              }}
              aria-hidden='true'
            >
              {word}
            </span>
            <span className='from-primary to-secondary col-start-1 row-start-1 bg-linear-to-tr bg-clip-text font-semibold text-transparent'>
              {word}
            </span>
          </span>
          {index < words.length - 1 && ' '}
        </Fragment>
      ))}
    </>
  );
};

export default StrokeText;
