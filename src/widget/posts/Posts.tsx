"use client";

import React, { ChangeEvent, MutableRefObject, useCallback, useEffect, useRef, useState } from "react";
import { IUseInfiniteScroll, ModalKey, useInfiniteScroll, useModal, useQueryParams } from "@/shared/lib";
import {
  GetAllPostsQuery,
  useGetAllPostsLazyQuery,
} from "@/graphql/queries/posts/getAllPosts.generated";
import s from "./Posts.module.scss";
import { UserCard } from "@/entities/userCard/UserCard";
import { useGetAccessKeyFromStorage } from "@/shared/lib/hooks/useGetAccessKeyFromStorage";
import { Post } from "@/graphql/types";
import { usePostAddedSubscription } from "@/graphql/subscriptions/postAdded.generated";
import { BanUserModal, UnbanUserModal } from "@/features";
import { Input } from "@momecap/ui-kit-snapmoment";

const START_POSTS_COUNT = 10;
const NEXT_POSTS_COUNT = 10;

export const Posts = () => {
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const accessKey = useGetAccessKeyFromStorage();
  const { debouncedSearchValue, setSearchQuery, searchTerm } = useQueryParams();

  const { isOpen: isBanUserModalOpen, setOpen: setIsBanUserModalOpen } = useModal(ModalKey.BanUser);
  const { isOpen: isUnBanUserModalOpen, setOpen: setIsUnBanUserModalOpen } = useModal(ModalKey.UnBanUser);

  const [pickedInfo, setPickedInfo] = useState<{ userId: number | undefined; userName: string | undefined }>({
    userId: undefined,
    userName: undefined,
  });
  const [posts, setPosts] = useState<GetAllPostsQuery["getPosts"]["items"]>([]);

  const [getAllPosts, { data: fetchedData, loading }] = useGetAllPostsLazyQuery();

  // ПОЛУЧАЕМ ДАННЫЕ О НОВЫХ ПОСТАХ, БЕЗ ОБНОВЛЕНИЯ СТРАНИЦЫ ЧЕРЕЗ SUBSCRIPTION
  const { data: postAddedData } = usePostAddedSubscription()

  useEffect(() => {
    if (accessKey && debouncedSearchValue !== undefined) {
      setPosts([]);
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

  const hasNoMorePosts = fetchedData?.getPosts.totalCount === posts?.length;

  const onLoadNextPosts = useCallback(() => {
    if (!loading && !hasNoMorePosts && posts?.length) {
      const cursorID = posts[posts.length - 1]?.id;

      getAllPosts({
        variables: { endCursorPostId: cursorID, pageSize: NEXT_POSTS_COUNT },
        context: { base64UsernamePassword: accessKey },
      });
    }
  }, [getAllPosts, hasNoMorePosts, loading, posts]);

  useInfiniteScroll({
    callBack: onLoadNextPosts,
    rootMargin: "0px",
    threshold: 0.1,
    triggerRef,
  } as IUseInfiniteScroll);

  useEffect(() => {
    console.log({itCalledAndFetched: fetchedData?.getPosts?.items});
    if (fetchedData?.getPosts?.items) {
      setPosts((prev) => {
        const newPosts = fetchedData.getPosts.items.filter(
          (newPost) => !prev.some((post) => post.id === newPost.id)
        );
        return [...prev, ...newPosts];
      });
    }
  }, [fetchedData]);

  // Обработка добавления новых постов из подписки. ЧЕРЕЗ SUBSCRIPTION МЫ ОПРЕДЕЛЯЕМ ПОЯВЛЕНИЕ НОВЫХ ПОСТОВ И ОНИ ДОБАВЛЯЮТСЯ, БЕЗ ОБНОВЛЕНИЯ СТРАНЦИЦЫ
  useEffect(() => {
    if (postAddedData?.postAdded) {
      setPosts((prevPosts) => {
        // Проверяем, нет ли поста с таким же ID в текущем списке
        const isPostAlreadyExists = prevPosts.some((post) => post.id === postAddedData.postAdded.id);
        if (isPostAlreadyExists) {
          return prevPosts;
        }
        return [postAddedData.postAdded, ...prevPosts];
      });
    }
  }, [postAddedData]);

  const handlePickInfoAndOpenModal = useCallback(
    ({ post, value }: { post: Post; value: string }) => {
      setPickedInfo({ userId: post.postOwner.id, userName: post.postOwner.userName });
      if (value === "ban") {
        setIsBanUserModalOpen(true);
      } else {
        setIsUnBanUserModalOpen(true);
      }
    },
    [setIsBanUserModalOpen, setIsUnBanUserModalOpen]
  );

  const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.currentTarget.value);
  }, [setSearchQuery]);

  return (
    <>
      <BanUserModal
        isOpen={isBanUserModalOpen}
        setOpen={setIsBanUserModalOpen}
        userId={pickedInfo.userId}
        pickedUserName={pickedInfo.userName}
      />
      <UnbanUserModal
        isOpen={isUnBanUserModalOpen}
        setOpen={setIsUnBanUserModalOpen}
        post={fetchedData?.getPosts.items.find((post) => post.postOwner.id === pickedInfo.userId) || {} as Post}
      />
      <div style={{ marginBottom: "20px" }}>
        <Input callback={setSearchQuery} onChange={handleSearchChange} type={"search"} currentValue={searchTerm} />
      </div>
      <div className={s.container}>
        <div className={s.cards}>
          {posts.map((post) => (
            <UserCard key={post.id} post={post} openModalHandler={(value) => handlePickInfoAndOpenModal({ post, value })} />
          ))}
        </div>
        <div ref={triggerRef} style={{ opacity: 0 }}>.</div>
      </div>
    </>
  );
};
