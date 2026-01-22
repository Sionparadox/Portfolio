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
      >
        <Grid />
      </Button>
      <Button
        onClick={() => setViewType('list')}
        variant={viewType === 'list' ? 'inverted' : 'outline'}
        className='border-none'
      >
        <List />
      </Button>
    </div>
  );
};

export default ViewTypeToggle;
