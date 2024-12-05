"use client"
import {ChangeEvent, ReactElement, useEffect, useState} from "react";
import {Button, Input, Typography} from "@momecap/ui-kit-snapmoment";
import {GetAllUsersListTableQuery} from "@/graphql/queries/getAllUsersListTableData.generated";
import {SortDirection, User, UserBlockStatus} from "@/graphql/types";
import {Loading, UniversalTable} from "@/shared/ui";
import {UsersListTableDropDownButton} from "@/entities/usersListTable/ui/UsersListTableDropDownButton";
import {CircleBackslashIcon} from "@radix-ui/react-icons";
import s from './UsersListTable.module.scss'
import {useQueryParams, combineFirstLastName, formatDate, MAIN_DOMAIN} from "@/shared/lib";
import {ApolloError} from "@apollo/client";
import * as React from "react";
import {ActionTrigger} from "@/pagesComponents/usersList/UsersList";

type Props = {
  data: GetAllUsersListTableQuery | undefined,
  loading: boolean,
  error: ApolloError | undefined
  globalStyle?: string
  actionTrigger: ({id, actionName, userName}: ActionTrigger) => void
}

export const UsersListTable = (props: Props) => {
  const { data, loading, error, globalStyle, actionTrigger } = props
  const {setSortByQuery, currentSortBy} = useQueryParams()

  type TransformedDataSingleObj = {
    userId: ReactElement,
    username: string | null,
    // profileLink: string | null | undefined,
    profileLink: ReactElement,
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
        profileLink: (
          <Typography
            as={'a'}
            href={`https://${MAIN_DOMAIN}/profile/${item.id}`}
            target={'_blank'}
            rel="noopener noreferrer"
          >
            {item.profile.userName}
          </Typography>
        ),
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