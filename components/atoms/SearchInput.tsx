import { cn } from '@/lib/utils';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchInput = ({
  value,
  onChange,
  placeholder = '검색...',
  className,
}: SearchInputProps) => {
  return (
    <div className={cn('w-full', className)}>
      <input
        type='text'
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className='bg-card focus:ring-primary w-full rounded-lg border px-4 py-2 focus:ring focus:outline-none'
      />
    </div>
  );
};

export default SearchInput;
