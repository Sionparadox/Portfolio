'use client';

import { Check, Copy } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import useClipBoard from '../../hooks/useClipBoard';
import { Button } from '../atoms/Button';

type copyButtonProps = {
  text: string;
  className?: string;
};
const CopyButton = ({ text, className }: copyButtonProps) => {
  const { isCopied, copy } = useClipBoard();
  const handleCopy = () => {
    copy(text);
  };
  return (
    <Button
      variant='ghost'
      size='icon'
      onClick={handleCopy}
      disabled={isCopied}
      className={className}
    >
      <AnimatePresence mode='wait' initial={false}>
        {isCopied ? (
          <motion.div
            key='check'
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            <Check />
          </motion.div>
        ) : (
          <motion.div
            key='copy'
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            <Copy />
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
};

export default CopyButton;
