"use client"
import {UserTabsNavigation} from "@/widget/userTabsNavigation/UserTabsNavigation";
import {useState} from "react";
import {UserUploadedPhotos} from "./tabs/uploadedPhotos/UserUploadedPhotos";
import {UserPayments} from "@/entities/userPayments/UserPayments";
import {useGetOneUserQuery} from "@/graphql/queries/userData/getOneUserData.generated";
import Image from "next/image";
import {formatDate, MAIN_DOMAIN, userTabsVariants} from "@/shared/lib";
import {BackBtn} from "@/shared/ui";
import {Typography} from "@momecap/ui-kit-snapmoment";
import s from './UserTabs.module.scss'

export const UserTabs = ({userId} : {userId: number}) => {
  const [activeSection, setActiveSection] = useState(userTabsVariants.uploadedPhotos);
  const accessKey = localStorage.getItem('accessKey')

  const {data} = useGetOneUserQuery({
    variables: {
      userId
    },
    context: {
      base64UsernamePassword: accessKey
    },
  })

  const userData = data?.getUser

  console.log(userData)

  const renderActiveSection = () => {
    switch (activeSection) {
      case userTabsVariants.payments:
        return <UserPayments userId={userId} />;
        // return <h1>UserPayments</h1>;
      case userTabsVariants.followers:
        // return <UserFollowers/>;
        return <h1>UserFollowers</h1>;
      case userTabsVariants.following:
        // return <UserFollowing />;
        return <h1>UserFollowing</h1>;
      case userTabsVariants.uploadedPhotos:
        return <UserUploadedPhotos userId={userId}/>;
      default:
        return <UserUploadedPhotos userId={userId}/>;
    }
  };
  return (
    <>
      <h1>Ну это здравствуйте, конечно</h1>
      <BackBtn href={`/users-list`}>
        Back to Users List
      </BackBtn>
      <div className={s.about}>
        <div className={s.photoAndNameBlock}>
          <Image src={userData?.profile?.avatars?.[0]?.url || ''} alt={'avatar'} width={100} height={100} className={s.avatar}/>
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

      <UserTabsNavigation setActiveSection={setActiveSection} activeSection={activeSection}/>
      {renderActiveSection()}
    </>
  )
}