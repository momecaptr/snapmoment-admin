"use client"
import { Input } from "@momecap/ui-kit-snapmoment";
import { PaymentsListTable } from "@/entities";
import { PaginationWithSelect } from "@/shared/ui";
import {
  initialCurrentPage,
  selectOptionsForPagination,
  useQueryParams
} from "@/shared/lib";
import * as React from "react";
import { useGetAllPaymentsQuery } from "@/graphql/queries/payments/getAllPayments.generated";
import { SortDirection } from "@/graphql/types";
import { useEffect, useState } from "react";
import {useGetAccessKeyFromStorage} from "@/shared/lib/hooks/useGetAccessKeyFromStorage";

export const PaymentsList = () => {
  const {accessKey} = useGetAccessKeyFromStorage()
  const {newSortBy, newSortDirection, pageSize, pageNumber, debouncedSearchValue, setPageSizeQuery, setCurrentPageQuery} = useQueryParams()

  const {data, loading, error} =  useGetAllPaymentsQuery({
    variables: {
      searchTerm: debouncedSearchValue, // debouncedSearchValue
      pageSize: +pageSize, // Было itemsPerPage - количество эл-ов на странице
      pageNumber: +pageNumber, // Было currentPage - текущая страница
      sortBy: newSortBy, // currentOrderBy тут и sortBy и direction
      sortDirection: newSortDirection as SortDirection.Desc | SortDirection.Asc,
    },
    context: {
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

  return (
    <>
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
    </>
  );
};