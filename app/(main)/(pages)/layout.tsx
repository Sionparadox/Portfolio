export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className='flex grow flex-col pt-20 sm:pt-24'>{children}</div>;
}
