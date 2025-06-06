import { FC, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';

import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';

import {
  selectOrderData,
  selectIngredientsList,
  fetchOrderThunk,
  selectOrderLoading,
  fetchIngredientsThunk
} from '@slices';

type TIngredientsWithCount = {
  [key: string]: TIngredient & { count: number };
};

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const { number } = useParams<{ number: string }>();
  const orderNumber = Number(number);

  const orderData = useSelector(selectOrderData);
  const ingredients = useSelector(selectIngredientsList);
  const isLoading = useSelector(selectOrderLoading);

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredientsThunk());
    }
  }, [dispatch, ingredients.length]);

  useEffect(() => {
    if (!orderData || orderData.number !== orderNumber) {
      dispatch(fetchOrderThunk(orderNumber));
    }
  }, [dispatch, orderData, orderNumber]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, id) => {
        if (!acc[id]) {
          const ingredient = ingredients.find((ing) => ing._id === id);
          if (ingredient) {
            acc[id] = { ...ingredient, count: 1 };
          }
        } else {
          acc[id].count++;
        }
        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (sum, item) => sum + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo || isLoading) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
