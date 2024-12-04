"use client"
import s from './UserPaymentsTable.module.scss'
import {
  combineFirstLastName,
  formatDate,
  selectOptionsForPagination,
  useCustomToast,
  useQueryParams
} from "@/shared/lib";
import {SortDirection} from "@/graphql/types";
import {useGetAllPaymentsQuery} from "@/graphql/queries/payments/getAllPayments.generated";
import {useGetPaymentsByUserQuery} from "@/graphql/queries/payments/getPaymentsByUser.generated";
import {ReactElement, useEffect} from "react";
import {CircleBackslashIcon} from "@radix-ui/react-icons";
import {Typography} from "@momecap/ui-kit-snapmoment";
import {UsersListTableDropDownButton} from "@/entities/usersListTable/ui/UsersListTableDropDownButton";
import {Loading, PaginationWithSelect, UniversalTable} from "@/shared/ui";
import {formatSubscriptionType} from "@/shared/lib/helpers/transformData";

type Props = {
  userId: number,
  globalStyle?: string
}

export const UserPaymentsTable = (props: Props) => {
  const {userId, globalStyle} = props
  const {showToast} = useCustomToast()
  const accessKey = localStorage.getItem('accessKey')
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
    price: number,
    subscriptionType: string;
    paymentType: string
  }

  const transformedData: TransformedPaymentsDataSingleObj[] = oneUserPayments
    ? oneUserPayments?.getPaymentsByUser.items.map((item) => {
      return {
        dateOfPayment: formatDate(item.dateOfPayment),
        endDateOfSubscription: formatDate(item.endDate),
        price: item.price,
        subscriptionType: formatSubscriptionType(item.type),
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
      {!loading && <PaginationWithSelect
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