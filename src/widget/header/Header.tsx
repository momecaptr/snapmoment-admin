import React from 'react';

import { LocaleSwitcher } from '@/features';
import { AppLogo, AuthButtons, Loading, Wrapper } from '@/shared/ui';
import { useRouter } from 'next/router';

import s from './Header.module.scss';

export const Header = () => {
  // const { data: me, isLoading } = useMeQuery();
  // Тут нужно реализовать Me запрос без RTKQuery, НО ПРИ ЭТОМ ЧТОБЫ БЫЛ Reauth, также как было в RTKQuery в mutex. Также isLoading реализовать.
  const { pathname } = useRouter();

  if (isLoading) {
    // todo: Сделать маленькую крутилку или скелетон
    return <Loading />;
  }

  return (
    <header className={s.header}>
      <Wrapper className={s.wrapper} variant={'box'}>
        <AppLogo />
        <div className={s.itemsWrapper}>
          <LocaleSwitcher />
          {!me ? <AuthButtons pathname={pathname} /> : null}
        </div>
      </Wrapper>
    </header>
  );
};
