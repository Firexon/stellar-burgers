import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { selectFeedOrders, fetchFeedsThunk } from '@slices';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectFeedOrders);

  const handleGetFeeds = () => {
    dispatch(fetchFeedsThunk());
  };

  useEffect(() => {
    handleGetFeeds();
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
