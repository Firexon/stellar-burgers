import { FC, useEffect, useState, SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { ForgotPasswordUI } from '@ui-pages';

import { useDispatch, useSelector } from '../../services/store';
import {
  forgotPasswordThunk,
  getUserErrorSelector,
  clearUserError
} from '@slices';

export const ForgotPassword: FC = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const error = useSelector(getUserErrorSelector);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(clearUserError());
    dispatch(forgotPasswordThunk({ email }))
      .unwrap()
      .then(() => {
        localStorage.setItem('resetPassword', 'true');
        navigate('/reset-password', { replace: true });
      });
  };

  useEffect(() => {
    dispatch(clearUserError());
  }, [dispatch]);

  return (
    <ForgotPasswordUI
      errorText={error || ''}
      email={email}
      setEmail={setEmail}
      handleSubmit={handleSubmit}
    />
  );
};
