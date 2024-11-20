import React, {ReactElement} from 'react';
import {
  Button,
  CustomDropdownItem, CustomDropdownWrapper,
  MoreHorizontal,
  PersonRemove,
  Typography
} from "@momecap/ui-kit-snapmoment";
import {clsx} from "clsx";
import s from './UsersListTableDropDownButton.module.scss'
import {CircleBackslashIcon} from "@radix-ui/react-icons";

export const UsersListTableDropDownButton = () => {
  return (
    <>
      <CustomDropdownWrapper
        trigger={
          <div className={s.opener}>
            <MoreHorizontal style={{ height: '24px', width: '24px' }} />
          </div>
        }
        align={'end'}
        className={s.contentAspectsWrapper}
        isArrow={false}
        sideOffset={2}
      >
          <CustomDropdownItem
            className={clsx(s.contentAspects)}
          >
            <Button variant={'text'} className={s.aspectWrapper} onClick={() => {console.log(`delete`)}}>
              <PersonRemove className={s.icon} height={24} width={24} />
              <Typography variant={'regular_text_16'}>Delete user</Typography>
            </Button>
            <Button variant={'text'} className={s.aspectWrapper} onClick={() => {console.log(`ban`)}}>
              <CircleBackslashIcon className={s.icon} height={24} width={24} />
              <Typography variant={'regular_text_16'}>Ban in the system</Typography>
            </Button>
            <Button variant={'text'} className={s.aspectWrapper} onClick={() => {console.log(`more`)}}>
              <MoreHorizontal className={s.icon} height={24} width={24} />
              <Typography variant={'regular_text_16'}>More Information</Typography>
            </Button>
          </CustomDropdownItem>
      </CustomDropdownWrapper>
    </>
  );
};