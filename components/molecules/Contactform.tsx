'use client';

import { createContact, type ContactFormData } from '@/actions/contact';
import useThrottle from '@/hooks/useThrottle';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useCallback, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import GlassCard from '../atoms/GlassCard';
import LabelInput from './LabelInput';
import SubmitButton from './SubmitButton';

// Zod 스키마 정의
const contactSchema = z.object({
  name: z.string().min(2, '이름은 2자 이상 입력해주세요.'),
  email: z.string().email('올바른 이메일 형식을 입력해주세요.'),
  message: z.string().min(10, '메시지는 10자 이상 입력해주세요.'),
});

const ContactForm = ({ className }: { className?: string }) => {
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [throttleError, setThrottleError] = useState<string>('');
  const [remainingSeconds, setRemainingSeconds] = useState<number>(0);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const submitContact = useCallback(
    async (data: ContactFormData) => {
      const result = await createContact(data);
      setSubmitResult(result);
      setThrottleError('');

      if (result.success) {
        reset();
      }
    },
    [reset]
  );

  // 1분에 1번만 전송 가능하도록 쓰로틀링 적용
  const [throttledSubmit, getRemainingTime, isThrottled] = useThrottle(
    submitContact,
    60000
  );

  // 성공 상태 자동 리셋
  useEffect(() => {
    if (submitResult?.success) {
      const timer = setTimeout(() => {
        setSubmitResult(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [submitResult]);

  // 스로틀 에러 메시지 설정
  const handleThrottleError = useCallback(() => {
    const remaining = Math.ceil(getRemainingTime() / 1000);
    setRemainingSeconds(remaining);
    setThrottleError(`${remaining}초 후에 전송 가능합니다.`);
  }, [getRemainingTime]);

  // 카운트다운 자동 업데이트
  useEffect(() => {
    if (remainingSeconds <= 0) return;

    const updateCountdown = () => {
      const remaining = Math.ceil(getRemainingTime() / 1000);

      if (remaining <= 0) {
        setThrottleError('');
        setRemainingSeconds(0);
      } else {
        setThrottleError(`${remaining}초 후에 전송 가능합니다.`);
        setRemainingSeconds(remaining);
      }
    };

    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [remainingSeconds, getRemainingTime]);

  // 폼 제출 핸들러
  const onSubmit = useCallback(
    (data: ContactFormData) => {
      if (isThrottled()) {
        handleThrottleError();
        return;
      }

      throttledSubmit(data);
    },
    [isThrottled, handleThrottleError, throttledSubmit]
  );

  return (
    <GlassCard className='w-full'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn('flex h-full flex-col', className)}
      >
        <div className='flex grow flex-col gap-4'>
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
        </div>

        <div className='mt-4 flex flex-col gap-1'>
          <SubmitButton
            isSubmitting={isSubmitting}
            throttleError={throttleError}
            isSuccess={submitResult?.success}
            hasValidationError={Object.keys(errors).length > 0}
          />

          <div className='min-h-5'>
            {throttleError && (
              <p className='text-destructive text-sm'>{throttleError}</p>
            )}
            {submitResult && !submitResult.success && !throttleError && (
              <p className='text-destructive text-sm font-semibold'>
                {submitResult.message}
              </p>
            )}
          </div>
        </div>
      </form>
    </GlassCard>
  );
};

export default ContactForm;
