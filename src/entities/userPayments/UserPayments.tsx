"use client"
import s from './UserPayemnts.module.scss'
import {useQueryParams} from "@/shared/lib/hooks/useQueryParams";
import {SortDirection} from "@/graphql/types";
import {useGetAllPaymentsQuery} from "@/graphql/queries/payments/getAllPayments.generated";
import {useGetPaymentsByUserQuery} from "@/graphql/queries/payments/getPaymentsByUser.generated";

type Props = {
  userId: number
}

export const UserPayments = (props: Props) => {
  const {userId} = props
  const accessKey = localStorage.getItem('accessKey')
  const {searchTerm, newSortDirection, newSortBy, pageSize, pageNumber} = useQueryParams()
  const {data: allPaymentsData} = useGetAllPaymentsQuery({
    variables: {
      pageSize: +pageSize,
      pageNumber: +pageNumber,
      sortBy: newSortBy,
      sortDirection: newSortDirection as SortDirection.Desc | SortDirection.Asc,
      searchTerm,
    },
    context: {
      base64UsernamePassword: accessKey
    }
  })

  const {data: oneUserPayments} = useGetPaymentsByUserQuery({
    variables: {
      userId,
      pageSize: +pageSize,
      pageNumber: +pageNumber,
      sortBy: newSortBy,
      sortDirection: newSortDirection as SortDirection.Desc | SortDirection.Asc,
    },
    context: {
      base64UsernamePassword: accessKey
    }
  })

  console.log({allPaymentsData: allPaymentsData?.getPayments, oneUserPayments: oneUserPayments?.getPaymentsByUser})

  return (
    <div className={s.layout}>
      UserPayments
    </div>
  );
};