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
import {MouseEvent} from "react";
import {User} from "@/graphql/types";
import {ActionTrigger} from "@/entities/usersListTable/UsersListTable";

type Props = {
  userData: Omit<User, 'email' | 'profile'>,
  actionTrigger: ({id, actionName, userName}: ActionTrigger) => void
}

export const UsersListTableDropDownButton = (props: Props) => {
  const { userData, actionTrigger }  = props

  const commonHandler = (e: MouseEvent<HTMLButtonElement>) => {
    const actionName = e.currentTarget.dataset.actionName
    actionTrigger({id: userData.id, actionName: actionName || '', userName: userData.userName})
  }
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
            <Button variant={'text'} className={s.button} data-action-name={'delete'} onClick={commonHandler}>
              <PersonRemove className={s.icon} height={24} width={24} />
              <Typography variant={'regular_text_14'}>Delete user</Typography>
            </Button>
            <Button variant={'text'} className={s.button} data-action-name={`ban`} onClick={commonHandler}>
              <CircleBackslashIcon className={s.icon} height={24} width={24} />
              <Typography variant={'regular_text_14'}>Ban in the system</Typography>
            </Button>
            <Button variant={'text'} className={s.button} data-action-name={`more`} onClick={commonHandler}>
              <MoreHorizontal className={s.icon} height={24} width={24} />
              <Typography variant={'regular_text_14'}>More Information</Typography>
            </Button>
          </CustomDropdownItem>
      </CustomDropdownWrapper>
    </>
  );
};