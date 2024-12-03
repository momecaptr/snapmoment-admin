"use client"
import {UserTabsNavigation} from "@/widget/userTabsNavigation/UserTabsNavigation";
import {useState} from "react";
import {UserUploadedPhotos} from "@/widget/userTabs/tabs/uploadedPhotos/UserUploadedPhotos";
import {UserPayments} from "@/entities/userPayments/UserPayments";
import {useGetOneUserQuery} from "@/graphql/queries/userData/getOneUserData.generated";
import Image from "next/image";

export const  userTabsVariants = {
  uploadedPhotos: 'Uploaded photos',
  payments: 'Payments',
  followers: 'Followers',
  following: 'Following'
}

export const UserTabs = ({userId} : {userId: number}) => {
  const [activeSection, setActiveSection] = useState(userTabsVariants.uploadedPhotos);
  const accessKey = localStorage.getItem('accessKey')

  const {data: userData} = useGetOneUserQuery({
    variables: {
      userId: userId
    },
    context: {
      base64UsernamePassword: accessKey
    },
  })

  console.log({aboutUserWholeShit: userData})

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
      <Image src={userData?.getUser?.profile?.avatars?.[0]?.url || ''} alt={'avatar'} width={100} height={100}/>
      <Image src={userData?.getUser?.profile?.avatars?.[1]?.url || ''} alt={'avatar'} width={100} height={100}/>
      <UserTabsNavigation setActiveSection={setActiveSection} activeSection={activeSection} />
      {renderActiveSection()}
    </>
  )
}