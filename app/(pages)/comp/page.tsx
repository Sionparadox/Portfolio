import Container from '@/components/atoms/Container';
import AccentTitle from '@/components/molecules/AccentTitle';

const TodoList = ({
  title,
  contents,
}: {
  title: string;
  contents: string[];
}) => {
  return (
    <div className='bg-card flex w-full flex-col gap-2 rounded-xl border p-4'>
      <h2 className='text-lg font-bold'>{title}</h2>
      {contents.map((content) => (
        <p key={content} className='text-card-foreground text-left'>
          {content}
        </p>
      ))}
    </div>
  );
};

const Page = () => {
  return (
    <Container className='flex flex-col items-center justify-center gap-12 text-center'>
      <AccentTitle accentText='TODO' className='sm:pt-8' />
      <div className='grid w-full grid-cols-2 gap-2'>
        <TodoList
          title='메인'
          contents={['Hero 변경', 'Explore 내용', '테마 토글버튼 변경']}
        />
        <TodoList
          title='레이아웃'
          contents={[
            '모바일 드롭다운 메뉴 구림',
            'Layout 조정(Container과 layout)',
          ]}
        />
        <TodoList
          title='About'
          contents={[
            'About 이미지 실제 사진으로',
            'About 소개글 실제 내용으로',
            'Timeline 630px 에서 반응형 깨짐',
            '타임라인 스켈레톤',
          ]}
        />
        <TodoList
          title='Projects'
          contents={['프로젝트 스켈레톤', '리스트용 프로젝트리스트카드 만들기']}
        />
        <TodoList
          title='Contact'
          contents={[
            'Contact 제출버튼 애니메이션',
            'ContactForm 인풋부분 라벨링 + 배경색 카드로',
          ]}
        />
      </div>
    </Container>
  );
};

export default Page;
