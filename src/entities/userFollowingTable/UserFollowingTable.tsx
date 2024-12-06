"use client"
import s from './UserFollowingTable.module.scss'
import {
  formatDate, MAIN_DOMAIN,
  selectOptionsForPagination,
  useCustomToast,
  useQueryParams
} from "@/shared/lib";
import {SortDirection} from "@/graphql/types";
import {ReactElement, useEffect, useState} from "react";
import {Typography} from "@momecap/ui-kit-snapmoment";
import {Loading, PaginationWithSelect, UniversalTable} from "@/shared/ui";
import {useGetFollowingQuery} from "@/graphql/queries/following/getFollowing.generated";
import * as React from "react";
import {useGetAccessKeyFromStorage} from "@/shared/lib/hooks/useGetAccessKeyFromStorage";

type Props = {
  userId: number,
  globalStyle?: string
}

export const UserFollowingTable = (props: Props) => {
  const {userId, globalStyle} = props
  const accessKey = useGetAccessKeyFromStorage()

  const {showToast} = useCustomToast()
  const {newSortDirection, newSortBy, pageSize, pageNumber, setSortByQuery, setCurrentPageQuery, setPageSizeQuery, currentSortBy} = useQueryParams()

  const {data: userFollowing, loading, error} = useGetFollowingQuery({
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

  type TransformedFollowingDataSingleObj = {
    userId: number,
    username: string | null | undefined,
    profileLink: ReactElement,
    subscriptionDate: string;
  }

  const transformedData: TransformedFollowingDataSingleObj[] = userFollowing
    ? userFollowing?.getFollowing.items.map((item) => {
      return {
        userId: item.id,
        username: item.userName,
        profileLink: (
          <Typography
            as={'a'}
            href={`https://${MAIN_DOMAIN}/profile/${userId}`}
            target={'_blank'}
            rel="noopener noreferrer"
          >
            {item.userName}
          </Typography>
        ),
        subscriptionDate: formatDate(item.createdAt),
      };
    })
    : [];

  console.log({userFollowing: userFollowing?.getFollowing})

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
      {!loading && userFollowing && userFollowing.getFollowing.totalCount > 0 && <PaginationWithSelect
				pageNumber={pageNumber}
				pageSize={pageSize}
				selectOptions={selectOptionsForPagination}
				setPageNumber={setCurrentPageQuery}
				setPageSize={setPageSizeQuery}
        totalItems={userFollowing?.getFollowing.totalCount ?? 1}
				alignment={'left'}
			/>}
    </>
  );
};