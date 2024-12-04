import { LocaleSwitcher } from '@/features';
import { AppLogo, Wrapper } from '@/shared/ui';

import s from './Header.module.scss';

export const Header = () => {
  // const { data: me, isLoading } = useMeQuery();
  // Тут нужно реализовать Me запрос без RTKQuery, НО ПРИ ЭТОМ ЧТОБЫ БЫЛ Reauth, также как было в RTKQuery в mutex. Также isLoading реализовать.
  return (
    <header className={s.header}>
      <Wrapper variant={'box'} className={s.wrapper}>
        {/*<div className={s.wrapper}>*/}
          <AppLogo />
          <div className={s.itemsWrapper}>
            <LocaleSwitcher />
          </div>
        {/*</div>*/}
      </Wrapper>
    </header>
  );
};
