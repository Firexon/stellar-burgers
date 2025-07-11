import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { getUserSelector } from '@slices';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const userName = useSelector(getUserSelector)?.name;

  return <AppHeaderUI userName={userName} />;
};
