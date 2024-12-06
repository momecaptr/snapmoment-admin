"use client"
import * as React from 'react';
import {MutableRefObject, useCallback, useEffect, useRef, useState} from "react";
import {IUseInfiniteScroll, useInfiniteScroll, useQueryParams} from "@/shared/lib";
import {
  GetAllPostsQuery,
  useGetAllPostsLazyQuery,
  useGetAllPostsQuery
} from "@/graphql/queries/posts/getAllPosts.generated";
import s from './Posts.module.scss'
import {UserCard} from "@/entities/userCard/UserCard";
import {useGetAccessKeyFromStorage} from "@/shared/lib/hooks/useGetAccessKeyFromStorage";
import {SortDirection} from "@/graphql/types";

type Props = {
  data?: any
};

const START_POSTS_COUNT = 10;
const NEXT_POSTS_COUNT = 10;

export const Posts = (props: Props) => {
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const {accessKey} = useGetAccessKeyFromStorage()
  const {searchTerm, newSortBy, newSortDirection} = useQueryParams()

  // const {data: initData, loading} = useGetAllPostsQuery({
  //   variables: {
  //     endCursorPostId: 0,
  //     searchTerm,
  //   },
  //   context: {
  //     base64UsernamePassword: accessKey
  //   },
  //   skip: !accessKey
  // })

  const [getAllPosts, { data: fetchedData, loading, subscribeToMore, refetch }] = useGetAllPostsLazyQuery();
  const [posts, setPosts] = useState<GetAllPostsQuery['getPosts']['items']>(fetchedData?.getPosts?.items || []); // Локальное состояние для списка постов

  // Первоначальная загрузка постов
  useEffect(() => {
    if(accessKey){
      getAllPosts({
        variables: { pageSize: START_POSTS_COUNT, endCursorPostId: 0, searchTerm },
        context: { base64UsernamePassword: accessKey }
      });
    }
  }, [accessKey]);

  // Проверка на отсутствие дополнительных постов
  const hasNoMorePosts = fetchedData?.getPosts.totalCount === posts?.length;

  const onLoadNextPosts = useCallback(() => {
    if (!loading && !hasNoMorePosts && posts?.length) {
      const cursorID = posts[posts.length - 1]?.id;

      getAllPosts({
        variables: { endCursorPostId: cursorID, pageSize: NEXT_POSTS_COUNT },
        context: { base64UsernamePassword: accessKey }
      });
    }
  }, [getAllPosts, hasNoMorePosts, loading, posts]);

  useInfiniteScroll({
    callBack: onLoadNextPosts,
    rootMargin: '0px',
    threshold: 0.1,
    triggerRef
  } as IUseInfiniteScroll);

  // Обновление состояния постов при приходе новых данных
  useEffect(() => {
    if (fetchedData?.getPosts?.items) {
      setPosts((prev) => {
        const newPosts = fetchedData.getPosts.items.filter(
          (newPost) => !prev.some((post) => post.id === newPost.id)
        );
        return [...prev, ...newPosts];
      });// Добавление новых постов к текущему состоянию
    }
  }, [fetchedData]);

  return (
    <div className={s.container}>
      <div className={s.cards}>
        {posts.map((post) => (
          <UserCard key={post.id} post={post} />
        ))}
      </div>
      <div ref={triggerRef} style={{ opacity: 0 }}>
        .
      </div>
    </div>
  );
};