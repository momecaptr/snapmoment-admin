"use client"
import s from './UserPaymentsTable.module.scss'
import {
  formatDate,
  selectOptionsForPagination,
  useCustomToast,
  useQueryParams
} from "@/shared/lib";
import {SortDirection} from "@/graphql/types";
import {useGetAllPaymentsQuery} from "@/graphql/queries/payments/getAllPayments.generated";
import {useGetPaymentsByUserQuery} from "@/graphql/queries/payments/getPaymentsByUser.generated";
import {useEffect, useState} from "react";
import {Loading, PaginationWithSelect, UniversalTable} from "@/shared/ui";
import {formatSubscriptionType} from "@/shared/lib/helpers/transformData";
import {useGetAccessKeyFromStorage} from "@/shared/lib/hooks/useGetAccessKeyFromStorage";

type Props = {
  userId: number,
  globalStyle?: string
}

export const UserPaymentsTable = (props: Props) => {
  const {userId, globalStyle} = props
  const accessKey = useGetAccessKeyFromStorage()

  const {showToast} = useCustomToast()
  const {searchTerm, newSortDirection, newSortBy, pageSize, pageNumber, setSortByQuery, setCurrentPageQuery, setPageSizeQuery, currentSortBy} = useQueryParams()
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

  const {data: oneUserPayments, loading, error} = useGetPaymentsByUserQuery({
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

  type TransformedPaymentsDataSingleObj = {
    dateOfPayment: string,
    endDateOfSubscription: string,
    amount: number,
    subscription: string;
    paymentType: string
  }

  const transformedData: TransformedPaymentsDataSingleObj[] = oneUserPayments
    ? oneUserPayments?.getPaymentsByUser.items.map((item) => {
      return {
        dateOfPayment: formatDate(item.dateOfPayment),
        endDateOfSubscription: formatDate(item.endDate),
        amount: item.price,
        subscription: formatSubscriptionType(item.type),
        paymentType: item.paymentType as string
      };
    })
    : [];

  console.log({allPaymentsData: allPaymentsData?.getPayments, oneUserPayments: oneUserPayments?.getPaymentsByUser})

  const handleSortClick = (title: string) => {
    if(title.toLowerCase() !== 'username' || title.length > 0) {
      setSortByQuery(title);
    }
  }

  // Показываем тост только при изменении `error`
  useEffect(() => {
    if (error) {
      showToast({ message: error.message || "Произошла ошибка", type: "error" });
    }
  }, [error, showToast]);

  if(loading){
    return <Loading/>
  }

  return (
    <>
      {error && <p>{error.message}</p>}
      <UniversalTable
        data={transformedData}
        handleSortClick={handleSortClick}
        currentSortBy={currentSortBy}
        colsStyles={s.columnsWidth}
        globalStyle={s.marginTableBtm}
      />
      {!loading && oneUserPayments && oneUserPayments.getPaymentsByUser?.totalCount > 0 && <PaginationWithSelect
		    pageNumber={pageNumber}
		    pageSize={pageSize}
		    selectOptions={selectOptionsForPagination}
		    setPageNumber={setCurrentPageQuery}
		    setPageSize={setPageSizeQuery}
		    totalItems={oneUserPayments?.getPaymentsByUser.totalCount ?? 1}
		    alignment={'left'}
	    />}
    </>
  );
};