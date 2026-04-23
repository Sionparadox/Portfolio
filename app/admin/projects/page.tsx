import { getProjects } from '@/actions/project';
import AdminProjectsClient from '@/components/organisms/AdminProjectsClient';

export const metadata = {
  title: 'Admin Projects',
};

export default async function AdminProjectsPage() {
  const result = await getProjects();
  const projects = result.success && result.data ? result.data : [];

  return <AdminProjectsClient initialProjects={projects} />;
}
