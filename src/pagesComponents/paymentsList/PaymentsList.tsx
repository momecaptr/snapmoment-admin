"use client"
import {Input, Typography} from "@momecap/ui-kit-snapmoment";
import {PaymentsListTable} from "@/entities";
import {Loading, PaginationWithSelect} from "@/shared/ui";
import {
  combineFirstLastName, formatDate,
  initialCurrentPage,
  MAIN_DOMAIN,
  selectOptionsForPagination,
  useQueryParams
} from "@/shared/lib";
import * as React from "react";
import { useGetAllPaymentsQuery } from "@/graphql/queries/payments/getAllPayments.generated";
import { SortDirection } from "@/graphql/types";
import {ReactElement, useEffect, useState} from "react";
import s from "@/entities/usersListTable/UsersListTable.module.scss";
import {CircleBackslashIcon} from "@radix-ui/react-icons";
import {UsersListTableDropDownButton} from "@/entities/usersListTable/ui/UsersListTableDropDownButton";

export const PaymentsList = () => {
  const [accessKey, setAccessKey] = useState<string | null>(null);

  useEffect(() => {
    const IS_SERVER = typeof window === "undefined";
    if (!IS_SERVER) {
      const key = localStorage.getItem('accessKey');
      setAccessKey(key);
    }
  }, []);

  const {newSortBy, newSortDirection, pageSize, pageNumber, debouncedSearchValue, setPageSizeQuery, setCurrentPageQuery} = useQueryParams()

  console.log({newSortBy, newSortDirection})

  const {data, loading, error} =  useGetAllPaymentsQuery({
    variables: {
      searchTerm: debouncedSearchValue, // debouncedSearchValue
      pageSize: +pageSize, // Было itemsPerPage - количество эл-ов на странице
      pageNumber: +pageNumber, // Было currentPage - текущая страница
      sortBy: newSortBy, // currentOrderBy тут и sortBy и direction
      sortDirection: newSortDirection as SortDirection.Desc | SortDirection.Asc,
    },
    context: {
      // base64UsernamePassword: accessKey
      base64UsernamePassword: accessKey
    },
    skip: !accessKey
  })

  useEffect(() => {
    if (data) {
      const maxNumberOfPages = Math.ceil((data?.getPayments.totalCount ?? 0) / pageSize)

      if (maxNumberOfPages < pageNumber && maxNumberOfPages !== 0) {
        setCurrentPageQuery(maxNumberOfPages)
      }
      if (data?.getPayments.items.length === 0) {
        setCurrentPageQuery(Number(initialCurrentPage))
      }
    }
  }, [data, pageSize, pageNumber])

  console.log({accessKey, paymentsData: data})

  return (
    <div>
      ОПА, чирик
      <Input type={'search'}/>
      <PaymentsListTable data={data} loading={loading} error={error} />
      {!loading && <PaginationWithSelect
		    pageNumber={pageNumber}
		    pageSize={pageSize}
		    selectOptions={selectOptionsForPagination}
		    setPageNumber={setCurrentPageQuery}
		    setPageSize={setPageSizeQuery}
		    totalItems={data?.getPayments.totalCount ?? 1}
		    alignment={'left'}
	    />}
    </div>
  );
};