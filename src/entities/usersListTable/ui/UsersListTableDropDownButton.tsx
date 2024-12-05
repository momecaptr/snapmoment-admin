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
import {actionOptionsUponUser} from "@/shared/lib/constants/actionOptionsUponUser";
import {ActionTrigger} from "@/shared/lib";

type Props = {
  userData: Omit<User, 'email' | 'profile'>,
  actionTrigger: ({id, actionName, userName}: ActionTrigger) => void
}

export const UsersListTableDropDownButton = (props: Props) => {
  const { userData, actionTrigger }  = props

  // Функция для работы с кнопками дропдауна. Прокидывает id, actionName и userName. ActionName берет из data-атрибутов
  const commonHandler = (e: MouseEvent<HTMLButtonElement>) => {
    const actionName = e.currentTarget.dataset.actionName
    actionTrigger({id: userData.id, actionName: actionName || '', userName: userData.userName})
  }

  const isUserBanned = userData.userBan === null

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
            <Button variant={'text'} className={s.button} data-action-name={actionOptionsUponUser.delete} onClick={commonHandler}>
              <PersonRemove className={s.icon} height={24} width={24} />
              <Typography variant={'regular_text_14'}>Delete user</Typography>
            </Button>
            <Button variant={'text'} className={s.button} data-action-name={isUserBanned ? actionOptionsUponUser.ban : actionOptionsUponUser.unban} onClick={commonHandler}>
              {isUserBanned ? <CircleBackslashIcon className={s.icon} height={24} width={24} /> : <div className={s.icon} >👌</div>}
              <Typography variant={'regular_text_14'}>{isUserBanned ? 'Ban' : 'Unban'} in the system</Typography>
            </Button>
            <Button variant={'text'} className={s.button} data-action-name={actionOptionsUponUser.more} onClick={commonHandler}>
              <MoreHorizontal className={s.icon} height={24} width={24} />
              <Typography variant={'regular_text_14'}>More Information</Typography>
            </Button>
          </CustomDropdownItem>
      </CustomDropdownWrapper>
    </>
  );
};