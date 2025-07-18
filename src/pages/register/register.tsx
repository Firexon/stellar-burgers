import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearUserError,
  registerUserThunk,
  getUserErrorSelector
} from '@slices';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const error = useSelector(getUserErrorSelector);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(registerUserThunk({ email, name: userName, password }));
  };

  useEffect(() => {
    dispatch(clearUserError());
  }, [dispatch]);

  return (
    <RegisterUI
      errorText={error?.toString() || ''}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
