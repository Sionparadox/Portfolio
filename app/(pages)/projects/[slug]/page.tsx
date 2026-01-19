import Badge from '@/components/atoms/Badge';
import Container from '@/components/atoms/Container';
import Image from 'next/image';

const ProjectDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  return (
    <>
      {/* 프로젝트 설명 헤더 */}
      <div className='vertical-fade flex h-100 w-screen items-center justify-center overflow-hidden'>
        <Image
          src='/img/kid.jpeg'
          alt='Project Thumbnail'
          fill
          className='-z-10 object-cover blur-xs'
          priority
        />

        <Container className='relative z-10 text-center'>
          <h1 className='mb-2 text-3xl font-bold md:mb-4 md:text-4xl'>
            Project Title {slug}
          </h1>
          <p className='line-clamp-6 leading-relaxed font-medium'>
            Description Description Description Description Description
            Description Description Description Description Description
            Description Description Description Description Description
            Description Description Description Description Description
            Description Description Description Description Description
            Description
          </p>
        </Container>
      </div>

      <Container>
        <div></div>
      </Container>
    </>
  );
};

export default ProjectDetailPage;
