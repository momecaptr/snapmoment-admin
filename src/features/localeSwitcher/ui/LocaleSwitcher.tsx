"use client"
import React, { useState } from 'react';

import ByFlagIcon from '@/../public/lang/ByIcon';
import KzFlagIcon from '@/../public/lang/KzIcon';
import RuFlagIcon from '@/../public/lang/RuIcon';
import UaFlagIcon from '@/../public/lang/UaIcon';
import EnFlagIcon from '@/../public/lang/UsIcon';
import { LocaleMenuItem } from '@/features';

import s from '@/features/localeSwitcher/ui/LocaleSwitcher.module.scss';
import {ArrowIosDownOutline, CustomDropdownItem, CustomDropdownWrapper} from "@momecap/ui-kit-snapmoment";

type LangIcon = any;
export type LangType = 'by' | 'en' | 'kz' | 'ru' | 'ua';
export type FullName = 'English' | 'Беларуская' | 'Русский' | 'Українська' | 'Қазақ';
type LangData = {
  fullName: FullName;
  icon: LangIcon;
  isoCode: LangType;
};
type TypedLangData = Record<LangType, LangData>;

const LANG_DATA: TypedLangData = {
  by: { fullName: 'Беларуская', icon: <ByFlagIcon />, isoCode: 'by' },
  en: { fullName: 'English', icon: <EnFlagIcon />, isoCode: 'en' },
  kz: { fullName: 'Қазақ', icon: <KzFlagIcon />, isoCode: 'kz' },
  ru: { fullName: 'Русский', icon: <RuFlagIcon />, isoCode: 'ru' },
  ua: { fullName: 'Українська', icon: <UaFlagIcon />, isoCode: 'ua' }
};

export const LocaleSwitcher = () => {
  const [iconFlag, setIconFlag] = useState(<EnFlagIcon />); //заглушка
  const [currentLang, setCurrentLang] = useState<string>('English'); //заглушка

  return (
    <CustomDropdownWrapper
      trigger={
        <div aria-label={'Update dimensions'} className={s.IconButton} tabIndex={0}>
          <div className={s.flag}>{iconFlag}</div>
          {currentLang}
          <ArrowIosDownOutline className={s.iconArrowDown} />
        </div>
      }
      align={'center'}
      classNameArrow={s.arrow}
      isArrow={false}
    >
      <CustomDropdownItem className={s.DropdownMenuContent} tabIndex={3}>
        {Object.entries(LANG_DATA).map(([key, value]) => (
          <LocaleMenuItem
            fullName={value.fullName}
            icon={value.icon}
            isoCode={value.isoCode}
            key={key}
            onSelect={() => {}}
          />
        ))}
      </CustomDropdownItem>
    </CustomDropdownWrapper>
    /*<DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <div aria-label={'Update dimensions'} className={s.IconButton} tabIndex={0}>
          <div className={s.flag}>{iconFlag}</div>
          {currentLang}
          <ArrowIosDownOutline className={s.iconArrowDown} />
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className={s.DropdownMenuContent} sideOffset={3}>
          {Object.entries(LANG_DATA).map(([key, value]) => (
            <LocaleMenuItem
              fullName={value.fullName}
              icon={value.icon}
              isoCode={value.isoCode}
              key={key}
              onSelect={() => {}}
            />
          ))}
          <DropdownMenu.Arrow className={s.DropdownMenuArrow} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>*/
  );
};
