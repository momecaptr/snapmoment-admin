import * as React from 'react';
import ReactTimeAgo from 'react-time-ago';
import TimeAgoLib from 'javascript-time-ago';

// Импортируйте данные локализации для нужного языка
import en from 'javascript-time-ago/locale/en.json';

import s from './TimeAgo.module.scss';
import {Typography} from "@momecap/ui-kit-snapmoment";

// Зарегистрируйте локализацию
TimeAgoLib.addDefaultLocale(en);

type Props = {
  time: string;
};

export const TimeAgo = ({ time }: Props) => {
  return (
    <Typography className={s.date} variant={'small_text'}>
      <ReactTimeAgo date={new Date(time)} locale="en" />
    </Typography>
  );
};
