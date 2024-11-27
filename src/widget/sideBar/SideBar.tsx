"use client"
import React, { ComponentProps, ElementType, useState } from 'react';

import clsx from 'clsx';
import Link from 'next/link';

import s from './SideBar.module.scss';

import {
  PictureOutline,
  Person,
  TrendingUp,
  CreditCard,
  Typography,
  Button,
  LogOutOutline
} from "@momecap/ui-kit-snapmoment";

type MainLinksProps = {
  IconComponent: ElementType;
  name: MainLinksName;
  path: string;
  value: LinksValue;
};

type LinksValue =
  | 'users-list'
  | 'statistics'
  | 'payments-list'
  | 'posts-list'

type MainLinksName =
  'Users list' | 'Statistics' | 'Payments list' | 'Posts list';

type Props = ComponentProps<'div'>;
export const SideBar = (props: Props) => {
  const [activeIcon, setActiveIcon] = useState<LinksValue>('users-list');

  const mainLinks: MainLinksProps[] = [
    { IconComponent: Person, name: 'Users list', path: `/users-list`, value: 'users-list' },
    { IconComponent: TrendingUp, name: 'Statistics', path: '/statistics', value: 'statistics' },
    { IconComponent: CreditCard, name: 'Payments list', path: '/payments-list', value: 'payments-list' },
    { IconComponent: PictureOutline, name: 'Posts list', path: '/posts-list', value: 'posts-list' }
  ];

  return (
    <div className={s.container}>
      <div className={s.btns}>
        {mainLinks.map(({ IconComponent, name, path, value }) => (
          <Link className={s.btn} href={path} key={value} onClick={() => setActiveIcon(value)} shallow>
            <IconComponent
              // className={clsx(s.icon, { [s.active]: activeIcon === value }, value === 'search' && s.searchIcon)}
              className={clsx(s.icon)}
            />
            <Typography as={'span'} className={s.btnText} variant={'medium_text_14'}>
              {name}
            </Typography>
          </Link>
        ))}
      </div>
    </div>
  );
};
