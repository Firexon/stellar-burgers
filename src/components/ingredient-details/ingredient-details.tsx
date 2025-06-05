import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams, useLocation } from 'react-router-dom';
import {
  selectIngredientDetailsData,
  selectIngredientDetailsLoading,
  selectIngredientDetailsError,
  setIngredientDetails,
  clearIngredientData,
  selectIngredientsList,
  fetchIngredientsThunk
} from '@slices';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  const ingredients = useSelector(selectIngredientsList);
  const ingredient = ingredients.find((item) => item._id === id);

  const ingredientData = useSelector(selectIngredientDetailsData);
  const isLoading = useSelector(selectIngredientDetailsLoading);
  const error = useSelector(selectIngredientDetailsError);

  const location = useLocation();
  const isModal = location.state?.background;

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredientsThunk());
    }
  }, [dispatch, ingredients.length]);

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

  return (
    <div style={!isModal ? { maxWidth: 600, margin: '40px auto' } : undefined}>
      <IngredientDetailsUI ingredientData={ingredientData || ingredient!} />
    </div>
  );
};
