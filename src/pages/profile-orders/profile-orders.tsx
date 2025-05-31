import { useSelector } from '../../services/store';
import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';

export const ProfileOrders: FC = () => {
  const orders = useSelector((state) => state.profileOrders?.orders || []);

  return <ProfileOrdersUI orders={orders} />;
};
