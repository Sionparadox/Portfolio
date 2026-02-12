import { MessageSquare, Download } from 'lucide-react';
import StrokeText from '../atoms/StrokeText';
import AccentTitle from '../molecules/AccentTitle';
import LinkIconButton from '../molecules/LinkIconButton';
import SquareProfileImage from '../molecules/SquareProfileImage';

const AboutSection = () => {
  return (
    <div className='flex w-full flex-col items-center justify-center gap-8'>
      <AccentTitle text='About' accentText='Me' className='sm:pt-6' />
      <div className='flex w-full justify-center gap-8'>
        <div className='hidden shrink-0 md:block'>
          <SquareProfileImage />
        </div>
        <div className='flex flex-col gap-4'>
          <div className='border-secondary flex flex-1 flex-col gap-4 border-r-2 px-4 py-2 text-left leading-relaxed break-keep'>
            <h2 className='text-2xl'>
              &ldquo;사용자의 경험과 기술을 연결하는 견고한 다리를
              만듭니다.&rdquo;
            </h2>
            <p>
              <b>
                <StrokeText>작은 변화에서 큰 가치</StrokeText>를 만드는 개발자
                박시온입니다.
              </b>{' '}
              React, Next.js, TypeScript를 주력으로 프론트엔드 개발을 하고
              있습니다. 저는 <StrokeText>사소해 보이는 디테일</StrokeText>들이
              쌓여 높은 사용자 경험을 완성한다고 생각합니다. 사소한 인터랙션
              하나, 최적화 하나에 <StrokeText>집요하게 고민</StrokeText>하며
              사용자를 만족시키기 위해 노력합니다. 이러한 고민의 과정은 저를
              프론트엔드 개발자를 넘어, 시스템 전반을 아우르는 풀스택 엔지니어로
              나아가게 하는 핵심 동력이 됩니다.
            </p>
            <p>
              <b>
                저는 &ldquo;적당히 돌아가는 코드&rdquo;보다{' '}
                <StrokeText>&ldquo;구조가 탄탄한 코드&rdquo;</StrokeText>를
                지향합니다.
              </b>{' '}
              당장의 기능 구현도 중요하지만, 시간이 지난 후에도{' '}
              <StrokeText>읽기 쉽고 확장 가능한 코드</StrokeText>가 더 큰 가치를
              만든다고 생각합니다. 컴포넌트 설계부터 인프라 구성까지, 모든
              과정에서{' '}
              <StrokeText>&ldquo;왜 이렇게 구조화했는가?&rdquo;</StrokeText>에
              대한 명확한 근거를 찾으려 노력합니다. 또한, 알고리즘 문제 풀이를
              통해 효율적인 사고방식을 훈련하고 있으며, 이를 실제 코드에
              녹여내어{' '}
              <StrokeText>눈에 보이지 않는 영역까지 견고하게 설계</StrokeText>
              하는 데 집중합니다.
            </p>
            <p>
              <b>
                좋은 코드는 혼자 만드는 것이 아니라{' '}
                <StrokeText>함께 만들어가는 것</StrokeText>이라 믿습니다.
              </b>{' '}
              코드 리뷰에서의 피드백과 팀원간 기술적 논의는 개인의 성장을 넘어{' '}
              <StrokeText>팀 전체의 기술력을 높이</StrokeText>는 가장 빠른
              길이라고 생각합니다. 기술적 의견을 명확히 전달하되 다른 관점을
              존중하며, 다양한 직무의 구성원과 적극적으로 커뮤니케이션하며{' '}
              <StrokeText>팀의 시너지를 만드는 데 기여</StrokeText>합니다.
            </p>
          </div>
          <div className='mt-auto flex flex-wrap justify-center gap-3 md:justify-start md:pl-4'>
            <LinkIconButton
              href='/contact'
              icon={MessageSquare}
              className='w-36'
            >
              Contact Me
            </LinkIconButton>
            <LinkIconButton
              href='/resume.pdf'
              icon={Download}
              className='w-36'
              download
            >
              Resume
            </LinkIconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
