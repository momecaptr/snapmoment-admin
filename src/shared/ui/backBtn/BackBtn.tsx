import React, { ReactNode, memo } from 'react';

import Link from 'next/link';

import s from './BackBtn.module.scss';
import {ArrowBackOutline, Button} from "@momecap/ui-kit-snapmoment";

type Props = {
  children: ReactNode;
  href: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
};

const BackBtnComponent = ({ children, href, onClick }: Props) => {
  return (
    <Button as={Link} className={s.backBtn} href={href} onClick={onClick} variant={'text'}>
      <ArrowBackOutline className={s.backArrow} />
      {children}
    </Button>
  );
}

export const BackBtn = memo(BackBtnComponent);
