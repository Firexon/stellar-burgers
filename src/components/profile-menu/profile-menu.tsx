import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { logoutUserThunk } from '@slices';
import { ProfileMenuUI } from '@ui';

export const ProfileMenu: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUserThunk()).unwrap();
      navigate('/login');
    } catch (error) {
      console.error('Ошибка выхода:', error);
    }
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
