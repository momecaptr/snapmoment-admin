"use client";

import React, { useState, memo } from "react";
import Image from "next/image";
import Stub from "@/../public/epicpen_6ymMwEsBEI.png";
import s from "./UserCard.module.scss";
import { Post } from "@/graphql/types";
import { clsx } from "clsx";
import { Block, Button, Typography } from "@momecap/ui-kit-snapmoment";
import { PhotosSwiper, TimeAgo } from "@/shared/ui";
import { useGetOneUserQuery } from "@/graphql/queries/userData/getOneUserData.generated";
import { useGetAccessKeyFromStorage } from "@/shared/lib/hooks/useGetAccessKeyFromStorage";

type Props = {
  post: Post;
  openModalHandler: (value: string) => void;
};

export const UserCard = memo((props: Props) => {
  const { post, openModalHandler } = props;
  const [isShowText, setIsShowText] = useState(false);
  const accessKey = useGetAccessKeyFromStorage() ?? localStorage.getItem("accessKey");

  const toggleShowText = () => setIsShowText(!isShowText);

  const { data: oneUser } = useGetOneUserQuery({
    variables: { userId: post.postOwner.id },
    context: { base64UsernamePassword: accessKey },
  });

  const isUserBanned = !!oneUser?.getUser.userBan?.reason;

  const clickHandler = () => {
    openModalHandler(isUserBanned ? "unban" : "ban");
  };

  return (
    <div className={s.card}>
      <div className={s.photo}>
        <PhotosSwiper sliders={(post.images ?? []) as []} mockImg={Stub.src} />
      </div>

      <div className={clsx(s.content, isShowText && s.expanded)}>
        <div className={s.authorContainer}>
          <div className={s.author}>
            <Image
              alt={"author avatar"}
              className={s.authorPhoto}
              height={100}
              src={post.postOwner.avatars?.[1]?.url || Stub}
              width={100}
              unoptimized
            />
            <Typography variant={"h3"}>{post.postOwner.userName}</Typography>
          </div>
          <Button className={s.blockBtn} onClick={clickHandler}>
            <Block className={clsx(s.blockIcon, isUserBanned && s.banned)} />
          </Button>
        </div>

        <TimeAgo time={post.createdAt as string} />

        <Typography as={"p"} className={clsx(s.description, isShowText && s.expanded)} variant={"regular_text_14"}>
          {post.description}
        </Typography>

        {post.description.length > 100 && (
          <Button className={s.showBtn} onClick={toggleShowText}>
            {isShowText ? "Hide" : "Show more"}
          </Button>
        )}
      </div>
    </div>
  );
});

UserCard.displayName = "UserCard";
