'use client';

import { mountedAtom } from '@/atoms/mounted';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';

export const MountedProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const setMounted = useSetAtom(mountedAtom);

  useEffect(() => {
    setMounted(true);
  }, [setMounted]);

  return <>{children}</>;
};
