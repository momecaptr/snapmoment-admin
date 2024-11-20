"use client"
import {ReactElement} from "react";
import { Typography } from "@momecap/ui-kit-snapmoment";
import {useGetUsersListTableQuery} from "@/graphql/queries/getUsersListTableData.generated";
import {SortDirection, User, UserBlockStatus} from "@/graphql/types";
import {UniversalTable} from "@/shared/ui";
import {UsersListTableDropDownButton} from "@/entities/usersListTable/ui/UsersListTableDropDownButton";
import {CircleBackslashIcon} from "@radix-ui/react-icons";
import s from './UsersListTable.module.scss'

export const UsersListTable = () => {
  const accessKey = localStorage.getItem('accessKey')

  const {data, loading, error} =  useGetUsersListTableQuery({
    variables: {
      searchTerm: '',
      pageSize: 10,
      pageNumber: 1,
      sortBy: 'userName',
      sortDirection: SortDirection.Asc,
      statusFilter: UserBlockStatus.All
    },
    context: {
      base64UsernamePassword: accessKey
    },
    skip: !accessKey
  })
  console.log({data})

  type TransformedDataSingleObj = {
    userId: ReactElement,
    username: string,
    profileLink: string | null | undefined,
    dateAdded: string;
    lastColumnWithButtons: ReactElement
  }

  const formatPaymentType = (value: string) => {
    const types: Record<string, string> = { PAYPAL: 'PayPal', STRIPE: 'Stripe' };
    return types[value] || value;
  };

  const formatDate = (value: any) => new Date(value).toLocaleDateString('ru-RU');

  const formatSubscriptionType = (value: string) => {
    const types: Record<string, string> = { DAY: '1 day', MONTHLY: '1 month', WEEKLY: '7 days' };

    return types[value] || value;
  };

  const conditionalName = ({firstName, lastName} : { firstName: string | null | undefined, lastName: string | null | undefined }) => {
    let value
    if(firstName && firstName.length > 0) {
      value =firstName
      if(lastName && lastName.length > 0) {
        value = `${firstName} ${lastName}`
      }
    } else {
      value = 'N/A'
    }
    return value
  }


  const datatatata: User[] = [
    {userBan: {reason: '', createdAt: ''}, id: 1, profile: {firstName: 'test', lastName: 'test', createdAt: new Date(), id: 54}, userName: 'test888', createdAt: new Date(), email:'jopa@gmail.com'},
    {userBan: {reason: '', createdAt: ''}, id: 1, profile: {firstName: 'sdfsdfsa', lastName: 'test', createdAt: new Date(), id: 54}, userName: 'tes76t', createdAt: new Date(), email:'jopa@gmail.com'},
    {userBan: {reason: '', createdAt: ''}, id: 1, profile: {firstName: 'dfhfh', lastName: 'test', createdAt: new Date(), id: 54}, userName: 'tes543t', createdAt: new Date(), email:'jopa@gmail.com'},
    {userBan: {reason: '', createdAt: ''}, id: 1, profile: {firstName: 'GG', lastName: 'test', createdAt: new Date(), id: 54}, userName: 'tes423t', createdAt: new Date(), email:'jopa@gmail.com'},
    {userBan: {reason: '', createdAt: ''}, id: 1, profile: {firstName: 'te', lastName: 'test', createdAt: new Date(), id: 54}, userName: 'test123', createdAt: new Date(), email:'jopa@gmail.com'},
  ]

  const transformedData: TransformedDataSingleObj[] = data
    ? data.getUsers.users.map((item) => {
  // const transformedData: TransformedDataSingleObj[] = datatatata
  //   ? datatatata.map((item) => {
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
        )
      ,
        username: conditionalName({
          firstName: item.profile.firstName,
          lastName: item.profile.lastName,
        }),
        profileLink: item.profile.userName,
        dateAdded: formatDate(item.createdAt),
        lastColumnWithButtons: (
          <>
            <UsersListTableDropDownButton />
          </>
        )
      };
    })
    : [];

  if(loading){
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>ЭТА СТРАНИЦА, БРАТ</h1>
      {error && <p>{error.message}</p>}
      <UniversalTable<TransformedDataSingleObj> data={transformedData}/>
    </div>
  );
};