"use client"
import * as React from 'react';
import s from "./ProfileHead.module.scss";
import Image from "next/image";
import {Typography} from "@momecap/ui-kit-snapmoment";
import {formatDate, MAIN_DOMAIN} from "@/shared/lib";
import {useGetOneUserQuery} from "@/graphql/queries/userData/getOneUserData.generated";
import {useGetAccessKeyFromStorage} from "@/shared/lib/hooks/useGetAccessKeyFromStorage";

export const ProfileHead = ({userId} : {userId: number}) => {
  const accessKey = useGetAccessKeyFromStorage()

  const {data} = useGetOneUserQuery({
    variables: {
      userId
    },
    context: {
      base64UsernamePassword: accessKey
    },
  })

  const userData = data?.getUser

  return (
    <div className={s.about}>
      <div className={s.photoAndNameBlock}>
        <Image src={userData?.profile?.avatars?.[0]?.url || ''} alt={'avatar'} width={100} height={100}
               className={s.avatar}/>
        <div>
          <Typography variant={'h1'}>{userData?.profile.firstName} {userData?.profile.lastName}</Typography>
          <Typography
            as={'a'}
            href={`https://${MAIN_DOMAIN}/profile/${userId}`}
            target={'_blank'}
            rel="noopener noreferrer"
          >
            {userData?.userName}
          </Typography>
        </div>
      </div>
      <div className={s.userIdAndDateBlock}>
        <div className={s.userIdBlock}>
          <Typography className={s.grayTitle}>UserID</Typography>
          <Typography>{userData?.id}</Typography>
        </div>
        <div>
          <Typography className={s.grayTitle}>Profile Creation Date</Typography>
          <Typography>{formatDate(userData?.createdAt)}</Typography>
        </div>
      </div>
    </div>
  );
};