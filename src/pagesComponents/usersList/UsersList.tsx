"use client"
import {useGetUsersQuery} from "@/graphql/queries/getUsersData.generated";
import {SortDirection, UserBlockStatus} from "@/graphql/types";
import {useEffect, useState} from "react";

export const UsersList = () => {
  const accessKey = localStorage.getItem('accessKey')

  const {data, loading, error} =  useGetUsersQuery({
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

  if(loading){
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>ЭТА СТРАНИЦА, БРАТ</h1>
      {error && <p>{error.message}</p>}
      {data?.getUsers.users.map((user) => (
        <div key={user.id}>
          <p>{user.userName}</p>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
};