"use client"
import {ChangeEvent, ReactElement, useEffect, useState} from "react";
import {Button, Input, Typography} from "@momecap/ui-kit-snapmoment";
import {GetAllUsersListTableQuery} from "@/graphql/queries/getAllUsersListTableData.generated";
import {SortDirection, User, UserBlockStatus} from "@/graphql/types";
import {Loading, UniversalTable} from "@/shared/ui";
import {UsersListTableDropDownButton} from "@/entities/usersListTable/ui/UsersListTableDropDownButton";
import {CircleBackslashIcon} from "@radix-ui/react-icons";
import s from './UsersListTable.module.scss'
import {useQueryParams} from "@/shared/lib/hooks/useQueryParams";
import {ApolloError} from "@apollo/client";
import {useRemoveUserMutation} from "@/graphql/queries/removeUser.generated";
import {DeleteUserModal} from "@/widget/modals/deleteUserModal/DeleteUserModal";
import {ModalKey, useModal} from "@/shared/lib/hooks/useModal";
import {useRouter} from "next/navigation";
import {combineFirstLastName, formatDate} from "@/shared/lib";

export type ActionTrigger = {
  id: number,
  actionName: string,
  userName: string
}

type Props = {
  data: GetAllUsersListTableQuery | undefined,
  loading: boolean,
  error: ApolloError | undefined
  globalStyle?: string
}

export const UsersListTable = (props: Props) => {
  const { data, loading, error, globalStyle } = props
  const router = useRouter()
  const [pickedId, setPickedId] = useState<number | undefined>()
  const {setSortByQuery, currentSortBy} = useQueryParams()
  const { isOpen: isDeleteUserModalOpen, setOpen: setIsDeleteUserModalOpen } = useModal(ModalKey.DeleteUser);

  const actionTrigger = ({id, actionName, userName} : ActionTrigger) => {
    console.log({id, actionName})
    setPickedId(id)
    console.log({pickedId})
    if(actionName === 'delete') {
      setIsDeleteUserModalOpen(true)
    }
    if(actionName === 'more'){
      const url = `/profile/${id}/${userName}`
      // window.open(url, '_blank')
      router.push(url)
    }
  }

  type TransformedDataSingleObj = {
    userId: ReactElement,
    username: string,
    profileLink: string | null | undefined,
    dateAdded: string;
    lastColumnWithButtons: ReactElement
  }

  const transformedData: TransformedDataSingleObj[] = data
    ? data.getUsers.users.map((item) => {
      return {
        userId:(
          <div className={s.userIdCell}>
            <div className={s.userBanIcon} >
              {item.userBan?.reason && <CircleBackslashIcon width={'24px'} height={'24px'}/> }
            </div>
            <Typography variant={'medium_text_14'}>
              {item.id}
            </Typography>
          </div>
        ),
        username: combineFirstLastName({
          firstName: item.profile.firstName,
          lastName: item.profile.lastName,
        }),
        profileLink: item.profile.userName,
        dateAdded: formatDate(item.createdAt),
        lastColumnWithButtons: <UsersListTableDropDownButton userData={item} actionTrigger={actionTrigger} />
      };
    })
    : [];

  const handleSortClick = (title: string) => {
    if(title.toLowerCase() !== 'username' || title.length > 0) {
      setSortByQuery(title);
    }
  }

  if(loading){
    return <Loading/>
  }

  return (
    <div className={globalStyle}>
      <DeleteUserModal isOpen={isDeleteUserModalOpen} setOpen={setIsDeleteUserModalOpen} userId={pickedId} />
      {error && <p>{error.message}</p>}
      <UniversalTable<TransformedDataSingleObj>
        disableHoverHeaderStyle={s.disableHoverHeaderStyle}
        data={transformedData}
        handleSortClick={handleSortClick}
        currentSortBy={currentSortBy}
        colsStyles={s.columnsWidth}
      />
    </div>
  );
};


const formatPaymentType = (value: string) => {
  const types: Record<string, string> = { PAYPAL: 'PayPal', STRIPE: 'Stripe' };
  return types[value] || value;
};
const formatSubscriptionType = (value: string) => {
  const types: Record<string, string> = { DAY: '1 day', MONTHLY: '1 month', WEEKLY: '7 days' };

  return types[value] || value;
};

const mockData: User[] = [
  {userBan: {reason: '', createdAt: ''}, id: 1, profile: {firstName: 'test', lastName: 'test', createdAt: new Date(), id: 54}, userName: 'test888', createdAt: new Date(), email:'jopa@gmail.com'},
  {userBan: {reason: '', createdAt: ''}, id: 1, profile: {firstName: 'sdfsdfsa', lastName: 'test', createdAt: new Date(), id: 54}, userName: 'tes76t', createdAt: new Date(), email:'jopa@gmail.com'},
  {userBan: {reason: '', createdAt: ''}, id: 1, profile: {firstName: 'dfhfh', lastName: 'test', createdAt: new Date(), id: 54}, userName: 'tes543t', createdAt: new Date(), email:'jopa@gmail.com'},
  {userBan: {reason: '', createdAt: ''}, id: 1, profile: {firstName: 'GG', lastName: 'test', createdAt: new Date(), id: 54}, userName: 'tes423t', createdAt: new Date(), email:'jopa@gmail.com'},
  {userBan: {reason: '', createdAt: ''}, id: 1, profile: {firstName: 'te', lastName: 'test', createdAt: new Date(), id: 54}, userName: 'test123', createdAt: new Date(), email:'jopa@gmail.com'},
]