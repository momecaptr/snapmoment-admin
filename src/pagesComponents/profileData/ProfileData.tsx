"use client"
import * as React from 'react';
import {useState} from "react";
import {userTabsVariants} from "@/shared/lib";
import {UserPaymentsTable} from "@/entities";
import {BackBtn} from "@/shared/ui";
import {ProfileHead, UserUploadedPhotosTab, UserTabsNavigation} from "@/widget";
import {UserFollowersTable} from "@/entities/userFollowersTable/UserFollowersTable";
import {UserFollowingTable} from "@/entities/userFollowingTable/UserFollowingTable";

export const ProfileData = ({userId} : {userId: number}) => {
  const [activeSection, setActiveSection] = useState(userTabsVariants.uploadedPhotos);

  const renderActiveSection = () => {
    switch (activeSection) {
      case userTabsVariants.payments:
        return <UserPaymentsTable userId={userId} />;
      // return <h1>UserPaymentsTable</h1>;
      case userTabsVariants.followers:
        return <UserFollowersTable userId={userId}/>;
        // return <h1>UserFollowers</h1>;
      case userTabsVariants.following:
        return <UserFollowingTable userId={userId} />;
        // return <h1>UserFollowing</h1>;
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