"use client"
import {Input, SelectUI} from "@momecap/ui-kit-snapmoment";
import { PaymentsListTable } from "@/entities";
import { PaginationWithSelect } from "@/shared/ui";
import {
  initialCurrentPage, selectOptionsForBanFilter,
  selectOptionsForPagination,
  useQueryParams
} from "@/shared/lib";
import * as React from "react";
import { useGetAllPaymentsQuery } from "@/graphql/queries/payments/getAllPayments.generated";
import { SortDirection } from "@/graphql/types";
import {ChangeEvent, useEffect, useState} from "react";
import {useGetAccessKeyFromStorage} from "@/shared/lib/hooks/useGetAccessKeyFromStorage";
import s from './PaymentsList.module.scss'

export const PaymentsList = () => {
  const accessKey = useGetAccessKeyFromStorage()
  const {newSortBy, newSortDirection, pageSize, pageNumber, debouncedSearchValue, setSearchQuery, searchTerm, setPageSizeQuery, setCurrentPageQuery} = useQueryParams()

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

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentPageQuery(Number(initialCurrentPage))
    setSearchQuery(e.currentTarget.value)
  }

  return (
    <>
      <div className={s.inputWrapper}>
        <Input callback={setSearchQuery} onChange={handleSearchChange} type={'search'} currentValue={searchTerm} className={s.input}/>
      </div>
      <PaymentsListTable data={data} loading={loading} error={error} globalStyle={s.tableGlobal}/>
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