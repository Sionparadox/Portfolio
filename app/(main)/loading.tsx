import Loading from '@/components/atoms/Loading';

export default function LoadingPage() {
  return (
    <div className='animate-in fade-in fill-mode-forwards flex min-h-[50vh] w-full grow items-center justify-center opacity-0 delay-200 duration-300'>
      <Loading />
    </div>
  );
}
