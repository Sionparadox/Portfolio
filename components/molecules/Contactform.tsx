'use client';

import { createContact, type ContactFormData } from '@/actions/contact';
import useThrottle from '@/hooks/useThrottle';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../atoms/Button';
import GlassCard from '../atoms/GlassCard';
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
  const [throttleError, setThrottleError] = useState<string>('');
  const [remainingSeconds, setRemainingSeconds] = useState<number>(0);
  const pendingDataRef = useRef<ContactFormData | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const submitContact = async () => {
    if (!pendingDataRef.current) return;
    const result = await createContact(pendingDataRef.current);
    setSubmitResult(result);
    pendingDataRef.current = null;
    setThrottleError('');

    if (result.success) {
      reset();
    }
  };
  // 1분에 1번만 전송 가능
  const [throttledSubmit, getRemainingTime, isThrottled] = useThrottle(
    submitContact,
    60000
  );

  // 카운트다운 업데이트
  useEffect(() => {
    if (remainingSeconds <= 0) {
      setThrottleError('');
      return;
    }

    const interval = setInterval(() => {
      const remaining = Math.ceil(getRemainingTime() / 1000);
      setRemainingSeconds(remaining);
      if (remaining <= 0) {
        setThrottleError('');
      } else {
        setThrottleError(`${remaining}초 후에 전송 가능합니다.`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingSeconds, getRemainingTime]);

  const onSubmit = (data: ContactFormData) => {
    if (isThrottled()) {
      const remaining = Math.ceil(getRemainingTime() / 1000);
      setRemainingSeconds(remaining);
      setThrottleError(`${remaining}초 후에 전송 가능합니다.`);
      return;
    }

    pendingDataRef.current = data;
    throttledSubmit();
  };

  return (
    <GlassCard className='w-full'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn('flex h-full flex-col gap-4', className)}
      >
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
        <Button
          type='submit'
          className='w-full'
          disabled={isSubmitting || !!throttleError}
        >
          {isSubmitting ? (
            '전송 중...'
          ) : (
            <>
              <Send /> 전송
            </>
          )}
        </Button>
        <p className='text-destructive min-h-5 text-sm'>{throttleError}</p>
      </form>
    </GlassCard>
  );
};

export default ContactForm;
