"use client"
import * as React from 'react';
import {useState} from "react";
import {userTabsVariants} from "@/shared/lib";
import {UserPaymentsTable, UserUploadedPhotosTab, UserFollowersTable, UserFollowingTable} from "@/entities";
import {BackBtn} from "@/shared/ui";
import {ProfileHead, UserTabsNavigation} from "@/widget";

export const ProfileData = ({userId} : {userId: number}) => {
  const [activeSection, setActiveSection] = useState(userTabsVariants.uploadedPhotos);

  const renderActiveSection = () => {
    switch (activeSection) {
      case userTabsVariants.payments:
        return <UserPaymentsTable userId={userId} />;
      case userTabsVariants.followers:
        return <UserFollowersTable userId={userId}/>;
      case userTabsVariants.following:
        return <UserFollowingTable userId={userId} />;
      case userTabsVariants.uploadedPhotos:
        return <UserUploadedPhotosTab userId={userId}/>;
      default:
        return <UserUploadedPhotosTab userId={userId}/>;
    }
  };

  return (
    <>
      <BackBtn href={`/users-list`}>
        Back to Users List
      </BackBtn>
      <ProfileHead userId={userId} />
      <UserTabsNavigation setActiveSection={setActiveSection} activeSection={activeSection}/>
      {renderActiveSection()}
    </>
  );
};