import React from 'react';
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
            <MoreHorizontal height={24} width={24} />
          </div>
        }
        align={'end'}
        className={s.usersListDdWrapper}
        classNameTriggerActive={s.usersListDdWrapperWrapperActiveTrigger}
        isArrow={false}
        sideOffset={2}
      >
          <CustomDropdownItem
            className={clsx(s.usersListDdItem)}
          >
            <Button variant={'text'} className={s.button} onClick={() => {console.log(`delete`)}}>
              <PersonRemove className={s.icon} height={24} width={24} />
              <Typography variant={'regular_text_14'}>Delete user</Typography>
            </Button>
            <Button variant={'text'} className={s.button} onClick={() => {console.log(`ban`)}}>
              <CircleBackslashIcon className={s.icon} height={24} width={24} />
              <Typography variant={'regular_text_14'}>Ban in the system</Typography>
            </Button>
            <Button variant={'text'} className={s.button} onClick={() => {console.log(`more`)}}>
              <MoreHorizontal className={s.icon} height={24} width={24} />
              <Typography variant={'regular_text_14'}>More Information</Typography>
            </Button>
          </CustomDropdownItem>
      </CustomDropdownWrapper>
    </>
  );
};