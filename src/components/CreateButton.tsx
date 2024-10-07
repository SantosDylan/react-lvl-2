import { Category } from '../interfaces/categories.interface';

interface CreateButtonProps {
  selectedCategory: Category | null;
  onButtonClick : () => void;
}

export default function CreateButton({ selectedCategory, onButtonClick }: CreateButtonProps) {
  const disabled = !selectedCategory;

  const getButtonClasses = (disabled: boolean) => {
  const baseClasses = 'text-sm font-medium py-2 px-3 text-center rounded-lg border focus:outline-none focus:ring-2';
  const disabledClasses = 'bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed';
  

  return `${baseClasses} ${disabled ? disabledClasses : ''}`;
};

  return <button id='createBtn' disabled={disabled} className={getButtonClasses(disabled)} onClick={() => onButtonClick()}>Create</button>;
}
