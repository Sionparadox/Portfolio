import { getTimelines } from '@/actions/timeline';
import AdminTimelineClient from '@/components/organisms/AdminTimelineClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Timeline Management',
  description: '관리자 전용 타임라인 관리 페이지 입니다.',
};
const AdminTimelinePage = async () => {
  const result = await getTimelines();
  const timelines = result.success && result.data ? result.data : [];
  return <AdminTimelineClient timelines={timelines} />;
};

export default AdminTimelinePage;
