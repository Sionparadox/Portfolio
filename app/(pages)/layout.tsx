export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className='pt-16 sm:pt-24'>{children}</div>;
}
