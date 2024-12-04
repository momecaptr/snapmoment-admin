import Link from 'next/link';

import s from './AppLogo.module.scss';
import {SnapMomentLogo} from "@momecap/ui-kit-snapmoment";

export const AppLogo = () => (
  <Link className={s.logoWrapper} href={'/'}>
    <SnapMomentLogo className={s.logo} />SuperAdmin
  </Link>
);
