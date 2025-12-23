import { IconType } from 'react-icons';

type IconLabelProps = {
  Icon: IconType;
  label: string;
};
const IconLabel = ({ Icon, label }: IconLabelProps) => {
  return (
    <div className='flex items-center gap-4 border-b p-2'>
      <Icon className='size-6' />
      <span>{label}</span>
    </div>
  );
};

export default IconLabel;
