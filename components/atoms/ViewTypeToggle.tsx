import { Grid, List } from 'lucide-react';
import { Button } from './Button';

interface ViewTypeToggleProps {
  viewType: 'grid' | 'list';
  setViewType: (type: 'grid' | 'list') => void;
}

const ViewTypeToggle = ({ viewType, setViewType }: ViewTypeToggleProps) => {
  return (
    <div className='bg-card flex gap-2 rounded-lg border p-1'>
      <Button
        onClick={() => setViewType('grid')}
        variant={viewType === 'grid' ? 'inverted' : 'outline'}
        className='border-none'
        aria-label='그리드 보기'
      >
        <Grid />
      </Button>
      <Button
        onClick={() => setViewType('list')}
        variant={viewType === 'list' ? 'inverted' : 'outline'}
        className='border-none'
        aria-label='리스트 보기'
      >
        <List />
      </Button>
    </div>
  );
};

export default ViewTypeToggle;
