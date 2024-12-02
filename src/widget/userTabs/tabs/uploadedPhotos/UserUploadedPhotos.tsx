"use client"
import s from './UserUploadedPhotos.module.scss'
import {useGetPostsByUserQuery} from "@/graphql/queries/getPostsByUser.generated";
import Image from "next/image";
import {useGetPostsQuery} from "@/graphql/queries/getPosts.generated";
import {useQueryParams} from "@/shared/lib/hooks/useQueryParams";
import {SortDirection} from "@/graphql/types";

export const UserUploadedPhotos = ({userId} : {userId: number}) => {
  const accessKey = localStorage.getItem('accessKey')
  const {searchTerm, newSortDirection, newSortBy} = useQueryParams()
  const {data: notThatData} = useGetPostsByUserQuery({
    variables: {
      userId,
    },
    context: {
      base64UsernamePassword: accessKey
    },
  })
  const {data} = useGetPostsQuery({
    variables: {
      endCursorPostId: 10,
      searchTerm,
      pageSize: 8,
      sortBy: newSortBy,
      sortDirection: newSortDirection as SortDirection.Desc | SortDirection.Asc,
    },
    context: {
      base64UsernamePassword: accessKey
    }
  })
  console.log({posts: data?.getPosts.items, userId, usersPosts: notThatData?.getPostsByUser})
  return (
    <div className={s.layout}>
      {notThatData?.getPostsByUser.items?.map(item => {
        return (
          <>
            {item ? (
              <div className={s.item} key={item.id}>
                <Image src={item.url as string} alt={item.url as string} height={250} width={250} />
              </div>
            ) : (
              <h1>No images</h1>
            )}
          </>
        )
      })}
    </div>
  );
};