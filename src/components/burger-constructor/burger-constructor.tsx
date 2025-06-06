import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  selectConstructor,
  selectOrderRequest,
  selectOrderModalData,
  sendOrderThunk,
  setOrderModalData,
  isAuthorizedSelector,
  resetOrderRequest
} from '@slices';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { bun, ingredients } = useSelector(selectConstructor);
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderModalData);
  const isAuthorized = useSelector(isAuthorizedSelector);

  const constructorItems = useMemo(
    () => ({ bun, ingredients }),
    [bun, ingredients]
  );

  const onOrderClick = () => {
    if (!bun) return;
    if (!isAuthorized) return navigate('/login');
    if (orderRequest) return;

    const bunId = bun._id;
    const ingredientIds = ingredients.map((item) => item._id);
    const orderData = [bunId, ...ingredientIds, bunId];

    dispatch(sendOrderThunk(orderData));
  };

  const closeOrderModal = () => {
    dispatch(setOrderModalData(null));
    dispatch(resetOrderRequest());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
