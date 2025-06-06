import { useSelector, useDispatch } from '../../services/store';
import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState, ChangeEvent } from 'react';
import { updateUserThunk, getUserSelector } from '@slices';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUserSelector) || { name: '', email: '' };

  const [formValue, setFormValue] = useState({
    name: user.name,
    email: user.email,
    password: ''
  });

  useEffect(() => {
    setFormValue({
      name: user.name || '',
      email: user.email || '',
      password: ''
    });
  }, [user]);

  const isFormChanged =
    formValue.name !== user.name ||
    formValue.email !== user.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUserThunk(formValue));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user.name,
      email: user.email,
      password: ''
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
