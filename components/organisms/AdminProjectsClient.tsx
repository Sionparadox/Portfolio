'use client';

import { deleteProject } from '@/actions/project';
import { Button } from '@/components/atoms/Button';
import Container from '@/components/atoms/Container';
import AccentTitle from '@/components/molecules/AccentTitle';
import AdminProjectListCard from '@/components/molecules/AdminProjectListCard';
import ProjectModal from '@/components/organisms/ProjectModal';
import { ProjectItemType } from '@/types/project';
import { ArrowLeft, Plus } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

interface AdminProjectsClientProps {
  initialProjects: ProjectItemType[];
}

const AdminProjectsClient = ({ initialProjects }: AdminProjectsClientProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<ProjectItemType | null>(
    null
  );
  const [, startTransition] = useTransition();
  const router = useRouter();

  const handleEdit = (project: ProjectItemType) => {
    setProjectToEdit(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setProjectToEdit(null);
  };

  const handleDelete = async (id: string, title: string) => {
    if (
      confirm(
        `정말로 프로젝트 "${title}"을(를) 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.`
      )
    ) {
      startTransition(async () => {
        const result = await deleteProject(id);
        if (result.success) {
          router.refresh();
        } else {
          alert(`삭제 실패: ${result.message}`);
        }
      });
    }
  };

  return (
    <Container className='space-y-2'>
      <div className='flex flex-col items-end justify-between border-b pt-8 pb-4 sm:flex-row'>
        <AccentTitle
          text='Projects'
          accentText='Management'
          description='프로젝트를 추가, 수정, 삭제할 수 있습니다.'
        />

        <Button
          onClick={() => {
            setProjectToEdit(null);
            setIsModalOpen(true);
          }}
          variant='inverted'
        >
          프로젝트 추가
          <Plus />
        </Button>
      </div>

      <Button variant='plain' asChild>
        <Link href='/admin'>
          <ArrowLeft />
          대시보드로 돌아가기
        </Link>
      </Button>

      <div className='space-y-4'>
        {initialProjects.length === 0 ? (
          <div className='text-muted-foreground flex h-40 items-center justify-center rounded-xl border border-dashed'>
            등록된 프로젝트가 없습니다.
          </div>
        ) : (
          initialProjects.map((project) => (
            <AdminProjectListCard
              key={project.id}
              project={project}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        projectToEdit={projectToEdit}
      />
    </Container>
  );
};

export default AdminProjectsClient;
