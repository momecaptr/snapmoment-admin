"use client"
import {UsersListTable} from "@/entities/usersListTable/UsersListTable";
import {Input} from "@momecap/ui-kit-snapmoment";
import {ChangeEvent} from "react";
import {useQueryParams} from "@/shared/lib/hooks/useQueryParams";

export type AdditionalDataSingleObj = {
  isBlocked?: boolean; // Дополнительный флаг для отображения
};

export const UsersList = () => {

  const {setSearchQuery, searchTerm} = useQueryParams()
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    // setCurrentPageQuery(Number(initCurrentPage))
    setSearchQuery(e.currentTarget.value)
  }

  return (
    <div>
      <Input callback={setSearchQuery} onChange={handleSearchChange} type={'search'} currentValue={searchTerm}/>
      <h1>Некоторое дерьмо</h1>
      <UsersListTable />
    </div>
  );
};