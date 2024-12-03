"use client"
import s from './UserUploadedPhotos.module.scss'
import {useGetPostsByUserQuery} from "@/graphql/queries/getPostsByUser.generated";
import Image from "next/image";
import {useGetAllPostsQuery} from "@/graphql/queries/getAllPosts.generated";
import {useQueryParams} from "@/shared/lib/hooks/useQueryParams";
import {SortDirection} from "@/graphql/types";

export const UserUploadedPhotos = ({userId} : {userId: number}) => {
  const accessKey = localStorage.getItem('accessKey')
  const {searchTerm, newSortDirection, newSortBy} = useQueryParams()
  const {data} = useGetPostsByUserQuery({
    variables: {
      userId,
    },
    context: {
      base64UsernamePassword: accessKey
    },
  })
  const {data: notThatData2} = useGetAllPostsQuery({
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
  return (
    <div className={s.layout}>
      {
        !data?.getPostsByUser.items ? (
          <h1>No images</h1>
        ) : (
          data?.getPostsByUser.items?.map(item => {
            return (
              <div className={s.item} key={item.id}>
                <Image src={item.url as string} alt={item.url as string} height={250} width={250} key={item.id}/>
              </div>
            )
          })
        )
      }
    </div>
  );
};