import Container from '@/components/atoms/Container';
import ProjectArticle from '@/components/molecules/ProjectArticle';
import ProjectDetailBox from '@/components/molecules/ProjectDetailBox';
import ProjectNavigationCard from '@/components/molecules/ProjectNavigationCard';
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

      <Container className='pt-4'>
        <div className='flex flex-col gap-6 sm:flex-row md:gap-12'>
          <ProjectDetailBox className='h-fit w-full shrink-0 sm:sticky sm:top-28 sm:order-2 sm:w-80' />
          <div className='flex w-full flex-col gap-12'>
            <ProjectArticle
              title='Project Overview'
              description='포트폴리오 사이트입니다. 웹 프론트엔드 개발자라면 개인 포트폴리오를 위한 사이트는 필요하다고 생각합니다. 포트폴리오 사이트입니다. 웹 프론트엔드 개발자라면 개인 포트폴리오를 위한 사이트는 필요하다고 생각합니다. 포트폴리오 사이트입니다. 웹 프론트엔드 개발자라면 개인 포트폴리오를 위한 사이트는 필요하다고 생각합니다. 포트폴리오 사이트입니다. 웹 프론트엔드 개발자라면 개인 포트폴리오를 위한 사이트는 필요하다고 생각합니다. 포트폴리오 사이트입니다. 웹 프론트엔드 개발자라면 개인 포트폴리오를 위한 사이트는 필요하다고 생각합니다. 포트폴리오 사이트입니다. 웹 프론트엔드 개발자라면 개인 포트폴리오를 위한 사이트는 필요하다고 생각합니다. 포트폴리오 사이트입니다. 웹 프론트엔드 개발자라면 개인 포트폴리오를 위한 사이트는 필요하다고 생각합니다.'
            />
            <ProjectArticle
              title='What I Did'
              description='디자인, 개발, 배포 등 프로젝트 과정 전부 혼자 진행했습니다. 디자인, 개발, 배포 등 프로젝트 과정 전부 혼자 진행했습니다. 디자인, 개발, 배포 등 프로젝트 과정 전부 혼자 진행했습니다. 디자인, 개발, 배포 등 프로젝트 과정 전부 혼자 진행했습니다. 디자인, 개발, 배포 등 프로젝트 과정 전부 혼자 진행했습니다. 디자인, 개발, 배포 등 프로젝트 과정 전부 혼자 진행했습니다. 디자인, 개발, 배포 등 프로젝트 과정 전부 혼자 진행했습니다. 디자인, 개발, 배포 등 프로젝트 과정 전부 혼자 진행했습니다. 디자인, 개발, 배포 등 프로젝트 과정 전부 혼자 진행했습니다. 디자인, 개발, 배포 등 프로젝트 과정 전부 혼자 진행했습니다. 디자인, 개발, 배포 등 프로젝트 과정 전부 혼자 진행했습니다. 디자인, 개발, 배포 등 프로젝트 과정 전부 혼자 진행했습니다.'
            />
            <ProjectArticle
              title='What I Learned'
              description='혼자서 개발하면 참 외롭다. 혼자서 개발하면 참 외롭다. 혼자서 개발하면 참 외롭다. 혼자서 개발하면 참 외롭다. 혼자서 개발하면 참 외롭다. 혼자서 개발하면 참 외롭다. 혼자서 개발하면 참 외롭다. 혼자서 개발하면 참 외롭다. 혼자서 개발하면 참 외롭다. 혼자서 개발하면 참 외롭다. 혼자서 개발하면 참 외롭다. 혼자서 개발하면 참 외롭다. 혼자서 개발하면 참 외롭다. 혼자서 개발하면 참 외롭다.'
            />
          </div>
        </div>
        <div className='mt-16 flex w-full justify-between gap-2 sm:gap-20'>
          <ProjectNavigationCard
            direction='prev'
            title='One Hada'
            slug='one-hada'
            imageSrc='/img/timeline/hana.png'
          />
          <ProjectNavigationCard
            direction='next'
            title='One Hada Two Hada Three Hada Four Hada Five Hada Six Hada Seven Hada'
            slug='one-hada'
            imageSrc='/img/timeline/hana.png'
          />
        </div>
      </Container>
    </>
  );
};

export default ProjectDetailPage;
