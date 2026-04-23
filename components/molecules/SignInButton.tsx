'use client';

import { Button } from '@/components/atoms/Button';
import { useFormStatus } from 'react-dom';
import { FaGithub } from 'react-icons/fa6';

const SignInButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      type='submit'
      variant='outline'
      className='flex-1'
      disabled={pending}
      aria-busy={pending}
    >
      {pending ? '로그인 중...' : 'Sign in with GitHub'} <FaGithub />
    </Button>
  );
};

export default SignInButton;
