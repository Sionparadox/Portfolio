import Container from '@/components/atoms/Container';
import ProjectDetailBox from '@/components/molecules/ProjectDetailBox';
import Image from 'next/image';
import AccentTitle from '../../../../components/molecules/AccentTitle';

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
          <h1 className='mb-2 text-3xl font-bold sm:mb-4 sm:text-5xl'>
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

      <Container className='flex flex-col gap-8 pt-4 sm:flex-row'>
        <ProjectDetailBox className='h-fit w-full shrink-0 sm:sticky sm:top-28 sm:order-2 sm:w-80' />
        <div className='flex w-full flex-col gap-12'>
          <div className='space-y-2'>
            <AccentTitle
              as='h2'
              text='Project'
              accentText='Overview'
              color='neon'
              underline
            />
            <p>
              개인 포트폴리오 사이트입니다. 웹 프론트엔드 개발자라면 개인
              포트폴리오를 위한 사이트는 필요하다고 생각합니다. 개인 포트폴리오
              사이트입니다. 웹 프론트엔드 개발자라면 개인 포트폴리오를 위한
              사이트는 필요하다고 생각합니다.개인 포트폴리오 사이트입니다. 웹
              프론트엔드 개발자라면 개인 포트폴리오를 위한 사이트는 필요하다고
              생각합니다.개인 포트폴리오 사이트입니다. 웹 프론트엔드 개발자라면
              개인 포트폴리오를 위한 사이트는 필요하다고 생각합니다.개인
              포트폴리오 사이트입니다. 웹 프론트엔드 개발자라면 개인
              포트폴리오를 위한 사이트는 필요하다고 생각합니다.개인 포트폴리오
              사이트입니다. 웹 프론트엔드 개발자라면 개인 포트폴리오를 위한
              사이트는 필요하다고 생각합니다.개인 포트폴리오 사이트입니다. 웹
              프론트엔드 개발자라면 개인 포트폴리오를 위한 사이트는 필요하다고
              생각합니다.개인 포트폴리오 사이트입니다. 웹 프론트엔드 개발자라면
              개인 포트폴리오를 위한 사이트는 필요하다고 생각합니다.개인
              포트폴리오 사이트입니다. 웹 프론트엔드 개발자라면 개인
              포트폴리오를 위한 사이트는 필요하다고 생각합니다.
            </p>
          </div>
          <div className='space-y-2'>
            <AccentTitle
              as='h2'
              text='What I'
              accentText='Did'
              color='neon'
              underline
            />
            <p>
              디자인, 개발, 배포 등 프로젝트 과정 전부 직접 진행했습니다.
              디자인, 개발, 배포 등 프로젝트 과정 전부 직접 진행했습니다.
              디자인, 개발, 배포 등 프로젝트 과정 전부 직접 진행했습니다.
              디자인, 개발, 배포 등 프로젝트 과정 전부 직접 진행했습니다.
              디자인, 개발, 배포 등 프로젝트 과정 전부 직접 진행했습니다.
              디자인, 개발, 배포 등 프로젝트 과정 전부 직접 진행했습니다.
              디자인, 개발, 배포 등 프로젝트 과정 전부 직접 진행했습니다.
              디자인, 개발, 배포 등 프로젝트 과정 전부 직접 진행했습니다.
            </p>
          </div>
          <div className='space-y-2'>
            <AccentTitle
              as='h2'
              text='What I'
              accentText='Learned'
              color='neon'
              underline
            />
            <p>
              혼자서 개발하면 참 외롭다. 혼자서 개발하면 참 외롭다. 혼자서
              개발하면 참 외롭다. 혼자서 개발하면 참 외롭다. 혼자서 개발하면 참
              외롭다. 혼자서 개발하면 참 외롭다. 혼자서 개발하면 참 외롭다.
              혼자서 개발하면 참 외롭다. 혼자서 개발하면 참 외롭다. 혼자서
              개발하면 참 외롭다. 혼자서 개발하면 참 외롭다. 혼자서 개발하면 참
              외롭다. 혼자서 개발하면 참 외롭다. 혼자서 개발하면 참 외롭다.
              혼자서 개발하면 참 외롭다. 혼자서 개발하면 참 외롭다. 혼자서
              개발하면 참 외롭다.
            </p>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ProjectDetailPage;
