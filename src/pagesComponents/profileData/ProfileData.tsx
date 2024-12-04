"use client"
import * as React from 'react';
import {useState} from "react";
import {userTabsVariants} from "@/shared/lib";
import {UserPayments} from "@/entities/userPayments/UserPayments";
import {BackBtn} from "@/shared/ui";
import {ProfileHead, UserUploadedPhotosTab, UserTabsNavigation} from "@/widget";

export const ProfileData = ({userId} : {userId: number}) => {
  const [activeSection, setActiveSection] = useState(userTabsVariants.uploadedPhotos);

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
        return <UserUploadedPhotosTab userId={userId}/>;
      default:
        return <UserUploadedPhotosTab userId={userId}/>;
    }
  };

  return (
    <>
      <h1>Ну это здравствуйте, конечно</h1>
      <BackBtn href={`/users-list`}>
        Back to Users List
      </BackBtn>
      <ProfileHead userId={userId} />
      <UserTabsNavigation setActiveSection={setActiveSection} activeSection={activeSection}/>
      {renderActiveSection()}
    </>
  );
};