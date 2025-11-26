import { Landing } from '@/components/templates/Landing';

const TempArea = () => {
  return (
    <div className='min-h-screen w-full border-b-2 border-red-500 bg-slate-600'></div>
  );
};
const Page = () => {
  return (
    <div>
      <Landing />
      <TempArea />
      <TempArea />
      <TempArea />
      <TempArea />
    </div>
  );
};

export default Page;
