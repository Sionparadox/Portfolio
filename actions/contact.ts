'use server';

import { auth } from '@/auth';
import { ActionResult } from '@/types/actionResult';
import { Contact } from '@prisma/client';
import { revalidateTag } from 'next/cache';
import { getContactsQuery } from '@/lib/contact-queries';
import { ContactFormData, contactSchema } from '@/lib/contact-validation';
import { prisma } from '@/lib/prisma';

export type { ContactFormData };

export async function createContact(
  data: ContactFormData
): Promise<ActionResult<void>> {
  try {
    // 서버에서도 검증
    const validated = contactSchema.safeParse(data);
    if (!validated.success) {
      return {
        success: false,
        message: '입력값이 올바르지 않습니다.',
        error: validated.error.issues[0]?.message,
      };
    }

    // DB에 저장
    await prisma.contact.create({
      data: {
        name: validated.data.name,
        email: validated.data.email,
        message: validated.data.message,
      },
    });

    revalidateTag('contacts');

    return {
      success: true,
      message: '메시지가 성공적으로 전송되었습니다!',
    };
  } catch (error) {
    console.error('Contact 저장 실패:', error);
    return {
      success: false,
      message: '전송에 실패했습니다. 다시 시도해주세요.',
      error: error instanceof Error ? error.message : '알 수 없는 오류',
    };
  }
}

export async function getContacts(): Promise<ActionResult<Contact[]>> {
  try {
    const session = await auth();
    if (!session?.user) {
      return { success: false, message: '권한이 없습니다.' };
    }
    return await getContactsQuery();
  } catch (error) {
    console.error('Contact 조회 실패:', error);
    return {
      success: false,
      message: '연락 목록을 불러오는 중 오류가 발생했습니다.',
      error: error instanceof Error ? error.message : '알 수 없는 오류',
    };
  }
}

export async function deleteContact(id: string): Promise<ActionResult<void>> {
  try {
    const session = await auth();
    if (!session?.user) {
      return { success: false, message: '권한이 없습니다.' };
    }

    await prisma.contact.delete({ where: { id } });
    revalidateTag('contacts');

    return { success: true, message: '연락 정보가 성공적으로 삭제되었습니다.' };
  } catch (error) {
    console.error('Contact 삭제 실패:', error);
    return {
      success: false,
      message: '연락 정보 삭제에 실패했습니다.',
      error: error instanceof Error ? error.message : '알 수 없는 오류',
    };
  }
}
