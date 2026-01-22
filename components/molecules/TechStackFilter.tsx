import { Button } from '../atoms/Button';

interface TechStackFilterProps {
  allTechStacks: string[];
  selectedTechStacks: string[];
  onToggleTechStack: (tech: string) => void;
  onClearAll: () => void;
}

const TechStackFilter = ({
  allTechStacks,
  selectedTechStacks,
  onToggleTechStack,
  onClearAll,
}: TechStackFilterProps) => {
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex items-center justify-between'>
        <label className='text-card-title text-left text-sm font-semibold'>
          기술스택
        </label>
        {selectedTechStacks.length > 0 && (
          <button
            onClick={onClearAll}
            className='text-primary hover:text-primary/80 text-sm'
          >
            전체 해제 ({selectedTechStacks.length})
          </button>
        )}
      </div>
      <div className='flex flex-wrap gap-2'>
        {allTechStacks.map((tech) => (
          <Button
            key={tech}
            onClick={() => onToggleTechStack(tech)}
            variant={selectedTechStacks.includes(tech) ? 'inverted' : 'outline'}
            className='border transition-colors duration-300'
            size='sm'
          >
            {tech}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TechStackFilter;
