"use client"
import * as React from "react";
import { UsersListTable} from "@/entities";
import {Button, Input, SelectUI} from "@momecap/ui-kit-snapmoment";
import {ChangeEvent, Suspense, useEffect, useState} from "react";
import {
  useQueryParams,
  initialCurrentPage,
  selectOptionsForBanFilter,
  selectOptionsForPagination,
  actionOptionsUponUser,
  useModal, ModalKey, combineFirstLastName, useCustomToast, ActionTrigger
} from "@/shared/lib";
import {Loading, PaginationWithSelect} from "@/shared/ui";
import s from './UsersList.module.scss'
import {BanUserModal, DeleteUserModal} from "@/features";
import {useRouter} from "next/navigation";
import {SortDirection, UserBlockStatus} from "@/graphql/types";
import {useGetAllUsersListTableQuery} from "@/graphql/queries/getAllUsersListTableData.generated";
import {useUnBanUserMutation} from "@/graphql/mutations/unBanUser.generated";
import {GET_ALL_USERS} from "@/graphql/queries/userData/getAllUsersData";

export const UsersList = () => {
  const [accessKey, setAccessKey] = useState<string | null>(null);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const key = localStorage.getItem('accessKey');
      setAccessKey(key);
    }
  }, []);

  const router = useRouter()
  const {newSortBy, banFilter, setBanFilterQuery, newSortDirection, pageSize, pageNumber, debouncedSearchValue, setSortByQuery, setSearchQuery, searchTerm, setPageSizeQuery, setCurrentPageQuery} = useQueryParams()
  const [pickedUserId, setPickedUserId] = useState<number | undefined>()
  const { isOpen: isDeleteUserModalOpen, setOpen: setIsDeleteUserModalOpen } = useModal(ModalKey.DeleteUser);
  const { isOpen: isBanUserModalOpen, setOpen: setIsBanUserModalOpen } = useModal(ModalKey.BanUser);
  const {showToast} = useCustomToast()
  const [unBanUser, {loading: unBanUserLoading, error: unBanUserError}] = useUnBanUserMutation()

  const {data, loading, error} =  useGetAllUsersListTableQuery({
    variables: {
      searchTerm: debouncedSearchValue, // debouncedSearchValue
      pageSize: +pageSize, // Было itemsPerPage - количество эл-ов на странице
      pageNumber: +pageNumber, // Было currentPage - текущая страница
      statusFilter: banFilter as UserBlockStatus,
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
      const maxNumberOfPages = Math.ceil((data?.getUsers.pagination.totalCount ?? 0) / pageSize)

      if (maxNumberOfPages < pageNumber && maxNumberOfPages !== 0) {
        setCurrentPageQuery(maxNumberOfPages)
      }
      if (data?.getUsers.users.length === 0) {
        setCurrentPageQuery(Number(initialCurrentPage))
      }
    }
  }, [data, pageSize, pageNumber])

  /**
   * Эта функция нужна для разных действий (в usersListTable в dropDown меню прокидывается) над пользователем - удалить, заблокать, разблокать, посмотреть профиль.
   * Определяется действие по actionName, которое приходит от дочернего компонента
   */
  const actionTrigger = async ({id, actionName, userName} : ActionTrigger) => {
    setPickedUserId(id)
    if(actionName === actionOptionsUponUser.delete) {
      setIsDeleteUserModalOpen(true)
    }
    if(actionName === actionOptionsUponUser.more){
      const url = `/profile/${id}/${userName}`
      router.push(url)
    }
    if(actionName === actionOptionsUponUser.ban) {
      setIsBanUserModalOpen(true)
    }
    if(actionName === actionOptionsUponUser.unban) {
      try {
        await unBanUser(
          {
            variables: {userId: id},
            context: {base64UsernamePassword: accessKey},
            refetchQueries: [{
              context: { base64UsernamePassword: localStorage.getItem('accessKey') },
              query: GET_ALL_USERS,
              variables: {
                pageNumber: pageNumber,
                pageSize: pageSize,
                sortBy: newSortBy,
                sortDirection: newSortDirection,
                searchTerm: searchTerm,
                statusFilter: banFilter
              }
            }]
          }
        )
        showToast({message: 'User unbanned', type: 'success' })
      } catch (e) {
        showToast({message: `Something bad happened, ${unBanUserError}}`, type: 'error' })
      }
    }
  }

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentPageQuery(Number(initialCurrentPage))
    setSearchQuery(e.currentTarget.value)
  }

  const handleBanFilter = (items: string) => {
    setCurrentPageQuery(Number(initialCurrentPage))
    setBanFilterQuery(items)
  }

  const foundUser = data?.getUsers?.users.find(user => user.id === pickedUserId)
  const combinedName = combineFirstLastName({firstName: foundUser?.profile.firstName, lastName: foundUser?.profile.lastName, isNullToReturn: true})
  const userName = combinedName === null ? foundUser?.userName : combinedName

  return (
    <>
      <DeleteUserModal isOpen={isDeleteUserModalOpen} setOpen={setIsDeleteUserModalOpen} userId={pickedUserId} pickedUserName={userName}/>
      <BanUserModal isOpen={isBanUserModalOpen} setOpen={setIsBanUserModalOpen} userId={pickedUserId} pickedUserName={userName}/>
      <div className={s.usersListHeader}>
        <Input callback={setSearchQuery} onChange={handleSearchChange} type={'search'} currentValue={searchTerm} className={s.input} />
        <div className={s.select}>
          <SelectUI selectOptions={selectOptionsForBanFilter} value={banFilter} onValueChange={handleBanFilter} />
        </div>
      </div>
      <UsersListTable data={data} loading={loading} error={error} globalStyle={s.tableGlobal} actionTrigger={actionTrigger}/>
      {!loading && <PaginationWithSelect
        pageNumber={pageNumber}
        pageSize={pageSize}
        selectOptions={selectOptionsForPagination}
        setPageNumber={setCurrentPageQuery}
        setPageSize={setPageSizeQuery}
        totalItems={data?.getUsers.pagination.totalCount ?? 1}
        alignment={'left'}
      />}
    </>
  );
};