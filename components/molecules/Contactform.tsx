'use client';

import { createContact, type ContactFormData } from '@/actions/contact';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../atoms/Button';
import LabelInput from './LabelInput';

// Zod 스키마 정의
const contactSchema = z.object({
  name: z.string().min(2, '이름은 2자 이상 입력해주세요.'),
  email: z.string().email('올바른 이메일 형식을 입력해주세요.'),
  message: z.string().min(10, '메시지는 10자 이상 입력해주세요.'),
});

const ContactForm = ({ className }: { className?: string }) => {
  const [, setSubmitResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    const result = await createContact(data);
    setSubmitResult(result);

    if (result.success) {
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn('', className)}>
      <LabelInput
        label='이름'
        placeholder='이름을 입력해주세요.'
        {...register('name')}
        error={errors.name?.message}
      />
      <LabelInput
        label='이메일'
        type='email'
        placeholder='이메일을 입력해주세요.'
        {...register('email')}
        error={errors.email?.message}
      />
      <LabelInput
        label='메시지'
        multiline
        wrapperClassName='grow'
        className='h-full'
        placeholder='메시지를 입력해주세요.'
        {...register('message')}
        error={errors.message?.message}
      />
      <Button type='submit' className='w-full' disabled={isSubmitting}>
        {isSubmitting ? (
          '전송 중...'
        ) : (
          <>
            <Send /> 전송
          </>
        )}
      </Button>
    </form>
  );
};

export default ContactForm;
