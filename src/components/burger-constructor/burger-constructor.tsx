import { FC, useMemo } from 'react';
import { useSelector } from '../../services/store';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';

export const BurgerConstructor: FC = () => {
  const { bun, ingredients = [] } = useSelector((state) => state.constructor);
  const orderRequest = useSelector((state) => state.order.request);
  const orderModalData = useSelector((state) => state.order.orderData);

  const constructorItems = { bun, ingredients };

  const onOrderClick = () => {
    if (!bun || orderRequest) return;
    console.log('Заказ оформлен');
  };

  const closeOrderModal = () => {
    console.log('Закрыть модалку');
  };

  const price = useMemo(() => {
    const bunPrice = bun?.price ? bun.price * 2 : 0;
    const fillingPrice = (ingredients ?? []).reduce(
      (sum: number, item: TConstructorIngredient) => sum + item.price,
      0
    );
    return bunPrice + fillingPrice;
  }, [bun, ingredients]);

  // const price = useMemo(
  //   () =>
  //     (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
  //     constructorItems.ingredients.reduce(
  //       (s: number, v: TConstructorIngredient) => s + v.price,
  //       0
  //     ),
  //   [constructorItems]
  // );

  // return null;
  console.log('constructorItems:', constructorItems);
  console.log('price:', price);

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
