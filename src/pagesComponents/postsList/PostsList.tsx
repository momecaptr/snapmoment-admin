"use client"
import {Input} from "@momecap/ui-kit-snapmoment";
import {Posts} from "@/widget";
import { useQueryParams } from "@/shared/lib";
import {ChangeEvent} from "react";

export const PostsList = () => {

  // const {newSortBy, banFilter, setBanFilterQuery, newSortDirection, pageSize, pageNumber, debouncedSearchValue, setSortByQuery, setSearchQuery, searchTerm, setPageSizeQuery, setCurrentPageQuery} = useQueryParams()
  //
  // const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setSearchQuery(e.currentTarget.value)
  // }

  return (
    <>
      {/*<div style={{marginBottom: '20px'}}>*/}
      {/*  <Input callback={setSearchQuery} onChange={handleSearchChange} type={'search'} currentValue={searchTerm} />*/}
      {/*</div>*/}
      <div>
        <Posts />
      </div>
    </>
  );
}