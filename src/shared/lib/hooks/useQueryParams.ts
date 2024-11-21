"use client"
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {initCurrentPage, selectOptionPagination} from "@/entities/usersListTable/UsersListTable";
import {useDebounce} from "./useDebounce";

export const useQueryParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  if (!searchParams) {
    throw new Error('searchParams is null');
  }

  const query = Object.fromEntries(searchParams.entries());

  const itemsPerPage = Number(query.itemsPerPage) ?? Number(selectOptionPagination[0].value);
  const currentPage = Number(query.currentPage) ?? Number(initCurrentPage);
  const currentPageSearchParam = query.currentPage;
  const search = query.search ?? '';
  const currentSortBy = query.sortBy ?? '';

  const debouncedSearchValue = useDebounce(search);

  const setSearchQuery = (searchQuery: string) => {
    const newQuery = new URLSearchParams(searchParams);

    if (searchQuery === '') {
      newQuery.delete('searchTerm');
    } else {
      newQuery.set('searchTerm', searchQuery);
    }
    router.push(`${pathname}?${newQuery.toString()}`);
  };

  const setCurrentPageQuery = (currentPageQuery: number) => {
    const newQuery = new URLSearchParams(searchParams);

    if (currentPageQuery === Number(initCurrentPage)) {
      newQuery.delete('currentPage');
    } else {
      newQuery.set('currentPage', currentPageQuery.toString());
    }
    router.push(`${pathname}?${newQuery.toString()}`);
  };

  const setItemsPerPageQuery = (itemsPerPageQuery: number) => {
    const newQuery = new URLSearchParams(searchParams);

    if (itemsPerPageQuery === Number(selectOptionPagination[0].value)) {
      newQuery.delete('itemsPerPage');
    } else {
      newQuery.set('itemsPerPage', itemsPerPageQuery.toString());
    }
    router.push(`${pathname}?${newQuery.toString()}`);
  };

  const setSortByQuery = (sortByQuery: string) => {
    let newSortBy;

    switch (currentSortBy) {
      case `${sortByQuery}-asc`:
        newSortBy = `${sortByQuery}-desc`;
        break;
      case `${sortByQuery}-desc`:
        newSortBy = null;
        break;
      default:
        newSortBy = `${sortByQuery}-asc`;
        break;
    }

    const newQuery = new URLSearchParams(searchParams);

    if (newSortBy) {
      newQuery.set('sortBy', newSortBy);
    } else {
      newQuery.delete('sortBy');
    }
    router.push(`${pathname}?${newQuery.toString()}`);
  };

  const clearQuery = () => {
    const itemsPerPageValue = query.itemsPerPage;
    const newQuery = new URLSearchParams(searchParams);

    if (itemsPerPageValue) {
      newQuery.set('itemsPerPage', Array.isArray(itemsPerPageValue) ? itemsPerPageValue.join(',') : itemsPerPageValue);
    } else {
      newQuery.delete('itemsPerPage');
    }
    router.push(`${pathname}?${newQuery.toString()}`);
  };

  return {
    clearQuery,
    currentSortBy,
    currentPage,
    currentPageSearchParam,
    debouncedSearchValue,
    itemsPerPage,
    search,
    setCurrentPageQuery,
    setItemsPerPageQuery,
    setSearchQuery,
    setSortByQuery
  };
};
