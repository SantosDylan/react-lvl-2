import { Category } from '../interfaces/categories.interface';

interface CategorySelectProps {
  categories: Category[];
  error: TypeError | null;
  loading: boolean;
  selectedCategory: Category | null;
  onCategoryChange: (categoryName: string) => void;
}
export default function CategorySelect({ categories, error, loading, selectedCategory, onCategoryChange }: CategorySelectProps) {
  if (loading) return <div>Loading ...</div>;

  if (error) return <div>{error.message}</div>;

  if (categories) {
    return (
      <>
        <select name='category-select' id='categorySelect' value={selectedCategory?.name} onChange={e => onCategoryChange(e.target.value)} >
            <option value="default">Select a category</option>
          {categories.map((category) => (
            <option key={category.id}>{category.name}</option>
          ))}
        </select>
      </>
    );
  }
}
