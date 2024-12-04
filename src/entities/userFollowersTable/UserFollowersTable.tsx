"use client"
import s from './UserFollowersTable.module.scss'
import {
  formatDate, MAIN_DOMAIN,
  selectOptionsForPagination,
  useCustomToast,
  useQueryParams
} from "@/shared/lib";
import {SortDirection} from "@/graphql/types";
import {ReactElement, useEffect} from "react";
import {Typography} from "@momecap/ui-kit-snapmoment";
import {Loading, PaginationWithSelect, UniversalTable} from "@/shared/ui";
import {useGetFollowersQuery} from "@/graphql/queries/followers/getFollowers.generated";
import * as React from "react";

type Props = {
  userId: number,
  globalStyle?: string
}

export const UserFollowersTable = (props: Props) => {
  const {userId, globalStyle} = props
  const {showToast} = useCustomToast()
  const accessKey = localStorage.getItem('accessKey')
  const {newSortDirection, newSortBy, pageSize, pageNumber, setSortByQuery, setCurrentPageQuery, setPageSizeQuery, currentSortBy} = useQueryParams()

  const {data: userFollowers, loading, error} = useGetFollowersQuery({
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

  type TransformedFollowersDataSingleObj = {
    userId: number,
    username: string | null | undefined,
    profileLink: ReactElement,
    subscriptionDate: string;
  }

  const transformedData: TransformedFollowersDataSingleObj[] = userFollowers
    // ? userFollowers?.getFollowers.items.map((item) => {
    ? mockData.map((item) => {
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
            {item.userName} {item.id} а это userId {item.userId}
          </Typography>
        ),
        subscriptionDate: formatDate(item.createdAt),
      };
    })
    : [];

  console.log({userFollowers: userFollowers?.getFollowers})

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
      {/*{!loading && userFollowers && userFollowers.getFollowers.totalCount > 0 && <PaginationWithSelect*/}
      {!loading && <PaginationWithSelect
				pageNumber={pageNumber}
				pageSize={pageSize}
				selectOptions={selectOptionsForPagination}
				setPageNumber={setCurrentPageQuery}
				setPageSize={setPageSizeQuery}
				// totalItems={userFollowers?.getFollowers.totalCount ?? 1}
				totalItems={mockData.length}
				alignment={'left'}
			/>}
    </>
  );
};

const mockData = [
  {id: 1, userId: 1231, userName: 'Степа Коровин', createdAt: new Date()},
  {id: 2, userId: 123134534, userName: 'Франц', createdAt: new Date()},
  {id: 3, userId: 123541, userName: 'Rjjjkks', createdAt: new Date()},
  {id: 4, userId: 12391, userName: 'dfgsfgdgs', createdAt: new Date()},
  {id: 5, userId: 12831, userName: 'DFSIGHU', createdAt: new Date()},
  {id: 6, userId: 12371, userName: 'sgef e', createdAt: new Date()},
  {id: 7, userId: 123166, userName: 'Степа sg', createdAt: new Date()},
  {id: 8, userId: 1234351, userName: 'dЖепа', createdAt: new Date()},
  {id: 9, userId: 12317, userName: ' Жепа', createdAt: new Date()},
  {id: 10, userId: 1236, userName: 'GJfsg', createdAt: new Date()},
  {id: 111, userId: 1235, userName: 'Степа', createdAt: new Date()},
]
