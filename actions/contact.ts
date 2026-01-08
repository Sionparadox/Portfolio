'use server';

import { ActionResult } from '@/types/actionResult';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

// Zod 스키마
const contactSchema = z.object({
  name: z.string().min(2, '이름은 2자 이상 입력해주세요.'),
  email: z.string().email('올바른 이메일 형식을 입력해주세요.'),
  message: z.string().min(10, '메시지는 10자 이상 입력해주세요.'),
});

export type ContactFormData = z.infer<typeof contactSchema>;

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
