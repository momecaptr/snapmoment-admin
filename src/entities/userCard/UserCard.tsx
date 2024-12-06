"use client"
import {useState} from "react";
import Image from "next/image";
import Stub from '@/../public/epicpen_6ymMwEsBEI.png';
import s from './UserCard.module.scss'
import {Post} from "@/graphql/types";
import {clsx} from "clsx";
import {Block, Button, Typography} from "@momecap/ui-kit-snapmoment";
import {PhotosSwiper, TimeAgo} from "@/shared/ui";

type Props = {
  post: Post;
  // showPostModalHandler: (isOpen: boolean, postId?: number) => void;
};

export const UserCard = (props: Props) => {
  const { post,
    // showPostModalHandler,
  } = props
  const [isShowText, setIsShowText] = useState(false);

  const toggleShowText = () => setIsShowText(!isShowText);

  const lastIndex = post?.images?.length ? post.images.length - 1 : 0;
  const imageUrl = post?.images?.[lastIndex]?.url || Stub;

  return (
    <div className={s.card}>
      {/*<div className={s.photo} onClick={() => showPostModalHandler(true, post.id)}>*/}
      <div className={s.photo}>
        <PhotosSwiper sliders={(post.images ?? []) as []}/>
        {/*<Image*/}
        {/*  alt={'post photos'}*/}
        {/*  height={100}*/}
        {/*  src={imageUrl}*/}
        {/*  width={100}*/}
        {/*  unoptimized*/}
        {/*/>*/}
      </div>

      <div className={clsx(s.content, isShowText && s.expanded)}>
        <div className={s.authorContainer}>
          <div className={s.author}>
            <Image
              alt={'author avatar'}
              className={s.authorPhoto}
              height={100}
              src={post.postOwner.avatars?.[1]?.url || Stub}
              width={100}
              unoptimized
            />

            <Typography variant={'h3'}>{post.postOwner.userName}</Typography>
          </div>

          {isShowText && (
            <Button className={s.blockBtn} onClick={toggleShowText}>
              <Block className={s.blockIcon}/>
            </Button>
          )}
        </div>

        <TimeAgo time={post.createdAt as string}/>

        <Typography as={'p'} className={clsx(s.description, isShowText && s.expanded)} variant={'regular_text_14'}>
          {post.description}
        </Typography>

        {post.description.length > 100 && (
          <Button className={s.showBtn} onClick={toggleShowText}>
            {isShowText ? 'Hide' : 'Show more'}
          </Button>
        )}
      </div>
    </div>
  );
};