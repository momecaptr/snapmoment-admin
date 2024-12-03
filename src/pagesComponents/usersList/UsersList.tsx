"use client"
import { UsersListTable} from "@/entities/usersListTable/UsersListTable";
import {Button, Input, SelectUI} from "@momecap/ui-kit-snapmoment";
import {ChangeEvent, useEffect, useState} from "react";
import {useQueryParams} from "@/shared/lib/hooks/useQueryParams";
import {PaginationWithSelect} from "@/shared/ui";
import {useGetAllUsersListTableQuery} from "@/graphql/queries/getAllUsersListTableData.generated";
import {SortDirection, UserBlockStatus} from "@/graphql/types";
import s from './UsersList.module.scss'

export const selectOptionsBan = [
  {text: 'Not selected', value: 'ALL'},
  { text: 'Blocked', value: 'BLOCKED' },
  { text: 'Not blocked', value: 'UNBLOCKED' },
]

export const selectOptionPagination = [
  { text: '8', value: '8' },
  { text: '15', value: '15' },
  { text: '30', value: '30' },
  { text: '50', value: '50' },
]
export const initCurrentPage = '1'


export const UsersList = () => {
  const accessKey = localStorage.getItem('accessKey')
  const {newSortBy, banFilter, setBanFilterQuery, newSortDirection, pageSize, pageNumber, debouncedSearchValue, setSortByQuery, setSearchQuery, searchTerm, setPageSizeQuery, setCurrentPageQuery} = useQueryParams()

  const {data, loading, error} =  useGetAllUsersListTableQuery({
    variables: {
      searchTerm: debouncedSearchValue, // debouncedSearchValue
      pageSize: +pageSize, // Было itemsPerPage
      pageNumber: +pageNumber, // Было currentPage
      statusFilter: banFilter as UserBlockStatus,
      sortBy: newSortBy, // currentOrderBy тут и sortBy и direction
      sortDirection: newSortDirection as SortDirection.Desc | SortDirection.Asc,
    },
    context: {
      base64UsernamePassword: accessKey
    },
    skip: !accessKey
  })

  console.log({usersListData: data})

  useEffect(() => {
    if (data) {
      const maxNumberOfPages = Math.ceil((data?.getUsers.pagination.totalCount ?? 0) / pageSize)

      if (maxNumberOfPages < pageNumber && maxNumberOfPages !== 0) {
        setCurrentPageQuery(maxNumberOfPages)
      }
      if (data?.getUsers.users.length === 0) {
        setCurrentPageQuery(Number(initCurrentPage))
      }
    }
  }, [data, pageSize, pageNumber])


  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentPageQuery(Number(initCurrentPage))
    setSearchQuery(e.currentTarget.value)
  }

  const handleBanFilter = (items: string) => {
    setCurrentPageQuery(Number(initCurrentPage))
    setBanFilterQuery(items)
  }

  return (
    <>
      <div className={s.usersListHeader}>
        <Input callback={setSearchQuery} onChange={handleSearchChange} type={'search'} currentValue={searchTerm} className={s.input} />
        <div className={s.select}>
          <SelectUI selectOptions={selectOptionsBan} value={banFilter} onValueChange={handleBanFilter} />
        </div>
      </div>
      <UsersListTable data={data} loading={loading} error={error} globalStyle={s.tableGlobal}/>
      {!loading && <PaginationWithSelect
        pageNumber={pageNumber}
        pageSize={pageSize}
        selectOptions={selectOptionPagination}
        setPageNumber={setCurrentPageQuery}
        setPageSize={setPageSizeQuery}
        totalItems={data?.getUsers.pagination.totalCount ?? 1}
        alignment={'left'}
      />}
    </>
  );
};