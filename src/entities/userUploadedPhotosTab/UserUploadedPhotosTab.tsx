"use client"
import s from './UserUploadedPhotosTab.module.scss'
import {useGetPostsByUserQuery} from "@/graphql/queries/posts/getPostsByUser.generated";
import Image from "next/image";
import {useGetAllPostsQuery} from "@/graphql/queries/posts/getAllPosts.generated";
import {useQueryParams} from "@/shared/lib";
import {SortDirection} from "@/graphql/types";
import {clsx} from "clsx";
import {Typography} from "@momecap/ui-kit-snapmoment";
import {useEffect, useState} from "react";
import {useGetAccessKeyFromStorage} from "@/shared/lib/hooks/useGetAccessKeyFromStorage";

export const UserUploadedPhotosTab = ({userId} : {userId: number}) => {

  const accessKey = useGetAccessKeyFromStorage()

  const {searchTerm, newSortDirection, newSortBy} = useQueryParams()
  const {data} = useGetPostsByUserQuery({
    variables: {
      userId,
    },
    context: {
      base64UsernamePassword: accessKey,
    },
  })

  return (
    <div className={clsx(data?.getPostsByUser.items?.length === 0 ? s.empty : s.layout)}>
      {
        data?.getPostsByUser.items?.length === 0 ? (
          <Typography variant={'medium_text_14'}>No images added yet</Typography>
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