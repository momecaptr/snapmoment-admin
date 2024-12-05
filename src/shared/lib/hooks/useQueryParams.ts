"use client"
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {useDebounce} from "./useDebounce";
import {initialCurrentPage, selectOptionsForBanFilter, selectOptionsForPagination} from "@/shared/lib";

export const useQueryParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  if (!searchParams) {
    throw new Error('searchParams is null');
  }

  const query = Object.fromEntries(searchParams.entries());

  const pageSize = query.pageSize ? Number(query.pageSize) : Number(selectOptionsForPagination[0].value);
  const pageNumber = query.pageNumber ? Number(query.pageNumber) : Number(initialCurrentPage);
  const currentPageSearchParam = query.pageNumber;
  const searchTerm = query.searchTerm ?? '';
  const currentSortBy = query.sortBy ?? '';

  // Получение значения бан-фильтра из параметров URL, или по умолчанию - 'ALL'
  const banFilter = query.banFilter ? query.banFilter : selectOptionsForBanFilter[0].value;

  const debouncedSearchValue = useDebounce(searchTerm);

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

    if (currentPageQuery === Number(initialCurrentPage)) {
      newQuery.delete('pageNumber');
    } else {
      newQuery.set('pageNumber', currentPageQuery.toString());
    }
    router.push(`${pathname}?${newQuery.toString()}`);
  };

  const setPageSizeQuery = (pageSizeQuery: number) => {
    const newQuery = new URLSearchParams(searchParams);

    if (pageSizeQuery === Number(selectOptionsForPagination[0].value)) {
      newQuery.delete('pageSize');
    } else {
      newQuery.set('pageSize', pageSizeQuery.toString());
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

  const setBanFilterQuery = (banFilterQuery: string) => {
    const newQuery = new URLSearchParams(searchParams);

    if (banFilterQuery === selectOptionsForBanFilter[0].value) {
      newQuery.delete('banFilter');
    } else {
      newQuery.set('banFilter', banFilterQuery);
    }
    router.push(`${pathname}?${newQuery.toString()}`);
  };

  const [tempSortBy, newSortDirection] = currentSortBy.split('-')
  const getNewSortBy = () => {
    switch (tempSortBy){
      case 'userId': {
        return 'id'
      };
      case 'profileLink': {
        return 'userName'
      };
      case 'dateAdded': {
        return 'createdAt'
      };
      case 'subscription': {
        return 'type'
      };
      default: {
        return tempSortBy
      }
    }
  }

  const clearQuery = () => {
    const pageSizeValue = query.pageSize;
    const newQuery = new URLSearchParams(searchParams);

    if (pageSizeValue) {
      newQuery.set('pageSize', Array.isArray(pageSizeValue) ? pageSizeValue.join(',') : pageSizeValue);
    } else {
      newQuery.delete('pageSize');
    }
    router.push(`${pathname}?${newQuery.toString()}`);
  };

  return {
    clearQuery,
    currentSortBy,
    newSortDirection,
    newSortBy: getNewSortBy(),
    pageNumber,
    currentPageSearchParam,
    debouncedSearchValue,
    pageSize,
    searchTerm,
    banFilter, // Возвращаем бан-фильтр
    setCurrentPageQuery,
    setPageSizeQuery,
    setSearchQuery,
    setSortByQuery,
    setBanFilterQuery // Добавляем функцию для изменения бан-фильтра
  };
};
