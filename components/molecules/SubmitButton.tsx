'use client';

import { Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { memo, useEffect, useReducer, useRef } from 'react';
import { Button } from '../atoms/Button';

interface SubmitButtonProps {
  isSubmitting: boolean;
  throttleError: string;
  isSuccess?: boolean;
  hasValidationError?: boolean;
}

type Status = 'idle' | 'submitting' | 'success';
type Action =
  | { type: 'START_SUBMITTING' }
  | { type: 'SHOW_SUCCESS' }
  | { type: 'RESET' };

function statusReducer(state: Status, action: Action): Status {
  switch (action.type) {
    case 'START_SUBMITTING':
      return state === 'idle' ? 'submitting' : state;
    case 'SHOW_SUCCESS':
      return state === 'submitting' ? 'success' : state;
    case 'RESET':
      return 'idle';
    default:
      return state;
  }
}

const SubmitButton = memo(
  ({
    isSubmitting,
    throttleError,
    isSuccess = false,
    hasValidationError = false,
  }: SubmitButtonProps) => {
    const [status, dispatch] = useReducer(statusReducer, 'idle');
    const timersRef = useRef<{
      success?: NodeJS.Timeout;
      reset?: NodeJS.Timeout;
    }>({});

    // 에러 발생 시 타이머 정리 및 리셋
    useEffect(() => {
      const hasError = throttleError || hasValidationError;
      if (!hasError || status === 'idle') return;

      const timers = timersRef.current;
      if (timers.success) clearTimeout(timers.success);
      if (timers.reset) clearTimeout(timers.reset);
      dispatch({ type: 'RESET' });
    }, [throttleError, hasValidationError, status]);

    // 제출 시작
    useEffect(() => {
      if (!isSubmitting || status !== 'idle') return;
      dispatch({ type: 'START_SUBMITTING' });
    }, [isSubmitting, status]);

    // 제출 성공 시 success 상태로 전환 (딜레이)
    useEffect(() => {
      if (!isSuccess || status !== 'submitting') return;

      const timer = setTimeout(() => {
        dispatch({ type: 'SHOW_SUCCESS' });
      }, 800);
      timersRef.current.success = timer;

      return () => {
        clearTimeout(timer);
      };
    }, [isSuccess, status]);

    // success 상태에서 idle로 자동 리셋
    useEffect(() => {
      if (status !== 'success') return;

      const timer = setTimeout(() => {
        dispatch({ type: 'RESET' });
      }, 2000);
      timersRef.current.reset = timer;

      return () => {
        clearTimeout(timer);
      };
    }, [status]);

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
