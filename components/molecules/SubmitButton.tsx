'use client';

import { Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { memo, useEffect, useRef, useState } from 'react';
import { Button } from '../atoms/Button';

interface SubmitButtonProps {
  isSubmitting: boolean;
  throttleError: string;
  isSuccess?: boolean;
  hasValidationError?: boolean;
}

const SubmitButton = memo(
  ({
    isSubmitting,
    throttleError,
    isSuccess = false,
    hasValidationError = false,
  }: SubmitButtonProps) => {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>(
      'idle'
    );
    const timersRef = useRef<{
      success?: NodeJS.Timeout;
      reset?: NodeJS.Timeout;
    }>({});

    useEffect(() => {
      const hasError = throttleError || hasValidationError;
      const isIdle = status === 'idle';
      const isSubmittingState = status === 'submitting';
      const isSuccessState = status === 'success';

      if (hasError && !isIdle) {
        if (timersRef.current.success) clearTimeout(timersRef.current.success);
        if (timersRef.current.reset) clearTimeout(timersRef.current.reset);
        setStatus('idle');
        return;
      }

      if (isSubmitting && isIdle) {
        setStatus('submitting');
        return;
      }

      if (isSuccess && isSubmittingState) {
        timersRef.current.success = setTimeout(() => {
          setStatus('success');
        }, 800);
        return () => {
          if (timersRef.current.success)
            clearTimeout(timersRef.current.success);
        };
      }

      if (isSuccessState) {
        timersRef.current.reset = setTimeout(() => {
          setStatus('idle');
        }, 2000);
        return () => {
          if (timersRef.current.reset) clearTimeout(timersRef.current.reset);
        };
      }
    }, [isSubmitting, throttleError, hasValidationError, isSuccess, status]);

    const isDisabled = !!throttleError || status === 'success';

    return (
      <motion.div
        whileHover={!isDisabled && status === 'idle' ? 'hover' : undefined}
        className='w-full'
      >
        <Button
          type='submit'
          className='relative w-full overflow-hidden'
          disabled={isDisabled || status !== 'idle'}
        >
          <span className='flex items-center justify-center'>
            <AnimatePresence mode='wait'>
              {status === 'success' ? (
                <motion.span
                  key='success'
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className='font-bold'
                >
                  전송완료!
                </motion.span>
              ) : (
                <motion.span
                  key='default'
                  className='flex items-center justify-center'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{
                    x: 300,
                    opacity: 0,
                    transition: { duration: 0.4, ease: 'easeIn' },
                  }}
                >
                  <motion.span
                    className='mr-2 inline-flex'
                    variants={{
                      hover: { rotate: 45 },
                    }}
                    animate={
                      status === 'submitting' ? { rotate: 45 } : { rotate: 0 }
                    }
                    transition={{ duration: 0.2 }}
                  >
                    <Send size={18} />
                  </motion.span>
                  {status === 'submitting' ? '전송 중...' : '전송'}
                </motion.span>
              )}
            </AnimatePresence>
          </span>
        </Button>
      </motion.div>
    );
  }
);

SubmitButton.displayName = 'SubmitButton';

export default SubmitButton;
