export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className='flex grow flex-col pt-16 sm:pt-24'>{children}</div>;
}
