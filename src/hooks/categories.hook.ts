import { useEffect, useState } from 'react';
import { Category, CategoryResponse } from '../interfaces/categories.interface';

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<TypeError | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://opentdb.com/api_category.php');
        console.log({ response });
        const categoriesResponse = (await response.json()) as CategoryResponse;
        setCategories(categoriesResponse.trivia_categories);
      } catch (err) {
        setError(err as TypeError);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, error, loading };
};
