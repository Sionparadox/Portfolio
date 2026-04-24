import { getProjects } from '@/actions/project';
import AdminProjectsClient from '@/components/organisms/AdminProjectsClient';

export const metadata = {
  title: 'Projects Management',
  description: '관리자 전용 프로젝트 관리 페이지 입니다.',
};

export default async function AdminProjectsPage() {
  const result = await getProjects();
  const projects = result.success && result.data ? result.data : [];

  return <AdminProjectsClient initialProjects={projects} />;
}
