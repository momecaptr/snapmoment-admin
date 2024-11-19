"use client"
import {useGetUsersQuery} from "@/graphql/queries/getUsersData.generated";
import {SortDirection, User, UserBlockStatus} from "@/graphql/types";
import {GetUsersListTableQuery, useGetUsersListTableQuery} from "@/graphql/queries/getUsersListTableData.generated";
import {UniversalTable} from "@/shared/ui";

export const UsersList = () => {
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
    userId: number,
    username: string,
    profileLink: string | null | undefined,
    dateAdded: string
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

  const transformedData: TransformedDataSingleObj[] = data ? data.getUsers.users.map((item) => {
    return {
      userId: item.id,
      username: conditionalName({firstName: item.profile.firstName, lastName: item.profile.lastName}),
      profileLink: item.profile.userName,
      dateAdded: formatDate(item.createdAt)
    }
  }) : []

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