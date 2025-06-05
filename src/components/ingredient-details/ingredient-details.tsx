import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import {
  selectIngredientDetailsData,
  selectIngredientDetailsLoading,
  selectIngredientDetailsError,
  setIngredientDetails,
  clearIngredientData,
  selectIngredientsList
} from '@slices';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  const ingredients = useSelector(selectIngredientsList);
  const ingredient = ingredients.find((item) => item._id === id);

  const ingredientData = useSelector(selectIngredientDetailsData);
  const isLoading = useSelector(selectIngredientDetailsLoading);
  const error = useSelector(selectIngredientDetailsError);

  useEffect(() => {
    if (ingredient) {
      dispatch(setIngredientDetails(ingredient));
    }
    return () => {
      dispatch(clearIngredientData());
    };
  }, [dispatch, ingredient]);

  if (!ingredient && !ingredientData) {
    return <p>Ингредиент не найден.</p>;
  }

  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return <IngredientDetailsUI ingredientData={ingredientData || ingredient!} />;
};
