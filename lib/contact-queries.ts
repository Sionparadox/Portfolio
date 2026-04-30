import { ActionResult } from '@/types/actionResult';
import { Contact } from '@prisma/client';
import { unstable_cache } from 'next/cache';
import { prisma } from '@/lib/prisma';

export async function getContactsQuery(): Promise<ActionResult<Contact[]>> {
  try {
    const getCachedContacts = unstable_cache(
      async () => {
        return await prisma.contact.findMany({
          orderBy: { createdAt: 'desc' },
        });
      },
      ['contacts'],
      {
        revalidate: false,
        tags: ['contacts'],
      }
    );

    const contacts = await getCachedContacts();

    return {
      success: true,
      message: '연락 목록을 성공적으로 불러왔습니다.',
      data: contacts,
    };
  } catch (error) {
    return {
      success: false,
      message: '연락 목록을 불러오는 중 오류가 발생했습니다.',
      error: error instanceof Error ? error.message : '알 수 없는 오류',
    };
  }
}
