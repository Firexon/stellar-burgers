import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      {/* Левая часть меню */}
      <div className={styles.menu_part_left}>
        <CustomNavLink
          to='/'
          icon={BurgerIcon}
          text='Конструктор'
          extraClass='mr-10'
          exact
        />
        <CustomNavLink to='/feed' icon={ListIcon} text='Лента заказов' />
      </div>

      {/* Логотип */}
      <div className={styles.logo}>
        <NavLink to='/' className={styles.logo_link}>
          <Logo className={styles.logo_image} />
        </NavLink>
      </div>

      {/* Профиль */}
      <div className={styles.link_position_last}>
        <CustomNavLink
          to='/profile'
          icon={ProfileIcon}
          text={userName || 'Личный кабинет'}
        />
      </div>
    </nav>
  </header>
);

const CustomNavLink: FC<{
  to: string;
  icon: React.ElementType;
  text: string;
  extraClass?: string;
  exact?: boolean;
}> = ({ to, icon: Icon, text, extraClass = '', exact }) => (
  <NavLink
    to={to}
    end={exact}
    className={({ isActive }) =>
      `${styles.link} ${isActive ? styles.link_active : ''} ${extraClass}`
    }
  >
    {({ isActive }) => (
      <>
        <Icon type={isActive ? 'primary' : 'secondary'} />
        <p className='text text_type_main-default ml-2'>{text}</p>
      </>
    )}
  </NavLink>
);
