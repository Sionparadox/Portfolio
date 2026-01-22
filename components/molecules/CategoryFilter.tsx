import { Button } from '../atoms/Button';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) => {
  return (
    <div className='flex flex-col gap-2'>
      <label className='text-card-title text-left text-sm font-semibold'>
        카테고리
      </label>
      <div className='flex flex-wrap gap-2'>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'inverted' : 'outline'}
            className='border transition-colors duration-300'
            onClick={() => onCategoryChange(category)}
            size='sm'
          >
            {category === 'all' ? '전체' : category}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
