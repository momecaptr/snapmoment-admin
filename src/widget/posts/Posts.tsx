"use client"
import * as React from 'react';
import {ChangeEvent, MutableRefObject, useCallback, useEffect, useRef, useState} from "react";
import {IUseInfiniteScroll, ModalKey, useInfiniteScroll, useModal, useQueryParams} from "@/shared/lib";
import {
  GetAllPostsQuery,
  useGetAllPostsLazyQuery,
  useGetAllPostsQuery
} from "@/graphql/queries/posts/getAllPosts.generated";
import s from './Posts.module.scss'
import {UserCard} from "@/entities/userCard/UserCard";
import {useGetAccessKeyFromStorage} from "@/shared/lib/hooks/useGetAccessKeyFromStorage";
import {Post, SortDirection} from "@/graphql/types";
import {usePostAddedSubscription} from "@/graphql/subscriptions/postAdded.generated";
import {BanUserModal, UnbanUserModal} from "@/features";
import {Input} from "@momecap/ui-kit-snapmoment";

type Props = {
  data?: any
};

const START_POSTS_COUNT = 10;
const NEXT_POSTS_COUNT = 10;

export const Posts = (props: Props) => {
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const accessKey = useGetAccessKeyFromStorage()
  const { debouncedSearchValue, setSearchQuery, searchTerm } = useQueryParams()
  const { isOpen: isBanUserModalOpen, setOpen: setIsBanUserModalOpen } = useModal(ModalKey.BanUser);
  const { isOpen: isUnBanUserModalOpen, setOpen: setIsUnBanUserModalOpen } = useModal(ModalKey.UnBanUser);
  const [pickedInfo, setPickedInfo] = useState<{userId: number | undefined, userName: string | undefined}>({userId: undefined, userName: undefined})

  const [getAllPosts, { data: fetchedData, loading, subscribeToMore, refetch }] = useGetAllPostsLazyQuery();
  const [posts, setPosts] = useState<GetAllPostsQuery['getPosts']['items']>(fetchedData?.getPosts?.items || []); // Локальное состояние для списка постов
  const [onePost, setOnePost] = useState<Post>({} as Post); // Локальное состояние для списка постов

  // Подписка на новые посты
  // При получении данных нового поста через onData обновляем состояние, добавляя новый пост в начало списка состояния posts
  const { data: subscriptionData } = usePostAddedSubscription();

  // Первоначальная загрузка постов и при изменении searchTerm
  useEffect(() => {
    if (accessKey && debouncedSearchValue !== undefined) {
      setPosts([]); // Очистить текущие посты перед загрузкой новых
      getAllPosts({
        variables: {
          pageSize: START_POSTS_COUNT,
          endCursorPostId: 0,
          searchTerm: debouncedSearchValue,
        },
        context: { base64UsernamePassword: accessKey },
      });
    }
  }, [accessKey, debouncedSearchValue, getAllPosts]);

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

  // Обновление списка постов при получении новых данных из подписки
  useEffect(() => {
    if (subscriptionData?.postAdded) {
      const newPost = subscriptionData.postAdded;
      setPosts((prevPosts) => [newPost, ...prevPosts]);
    }
  }, [subscriptionData]);

  const handlePickInfoAndOpenModal = ({post, value}: {post: Post, value: string}) => {
    console.log({post, value})
    setOnePost(post)
    if(value === 'ban') {
      setIsBanUserModalOpen(true)
      setPickedInfo({userId: post.postOwner.id, userName: post.postOwner.userName})
    }
    if(value === 'unban') {
      setIsUnBanUserModalOpen(true)
    }
  }

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.currentTarget.value)
  }

  return (
    <>
      <BanUserModal isOpen={isBanUserModalOpen} setOpen={setIsBanUserModalOpen} userId={pickedInfo.userId} pickedUserName={pickedInfo.userName}/>
      <UnbanUserModal post={onePost} isOpen={isUnBanUserModalOpen} setOpen={setIsUnBanUserModalOpen} />
      <div style={{marginBottom: '20px'}}>
        <Input callback={setSearchQuery} onChange={handleSearchChange} type={'search'} currentValue={searchTerm}/>
      </div>
      <div className={s.container}>
        <div className={s.cards}>
          {posts.map((post) => (
            <UserCard key={post.id} post={post} openModalHandler={(value: string) => handlePickInfoAndOpenModal({post, value})}/>
          ))}
        </div>
        <div ref={triggerRef} style={{opacity: 0}}>
          .
        </div>
      </div>
    </>
  );
};