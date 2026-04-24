import { getTimelines } from '@/actions/timeline';
import AdminTimelineClient from '@/components/organisms/AdminTimelineClient';

const AdminTimelinePage = async () => {
  const result = await getTimelines();
  const timelines = result.success && result.data ? result.data : [];
  return <AdminTimelineClient timelines={timelines} />;
};

export default AdminTimelinePage;
