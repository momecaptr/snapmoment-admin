"use client"
import {UserTabsNavigation} from "@/widget/userTabsNavigation/UserTabsNavigation";
import {useState} from "react";
import {UserUploadedPhotos} from "@/widget/userTabs/tabs/uploadedPhotos/UserUploadedPhotos";

export const  userTabsVariants = {
  uploadedPhotos: 'Uploaded photos',
  payments: 'Payments',
  followers: 'Followers',
  following: 'Following'
}

export const UserTabs = ({userId} : {userId: number}) => {
  const [activeSection, setActiveSection] = useState(userTabsVariants.uploadedPhotos);

  const renderActiveSection = () => {
    switch (activeSection) {
      case userTabsVariants.payments:
        // return <UserPayments />;
        return <h1>UserPayments</h1>;
      case userTabsVariants.followers:
        // return <UserFollowers/>;
        return <h1>UserFollowers</h1>;
      case userTabsVariants.following:
        // return <UserFollowing />;
        return <h1>UserFollowing</h1>;
      case userTabsVariants.uploadedPhotos:
      default:
        return <UserUploadedPhotos userId={userId}/>;
        // return <h1>UserUploadedPhotos</h1>;
    }
  };
  return (
    <>
      <UserTabsNavigation setActiveSection={setActiveSection} activeSection={activeSection} />
      <div style={{backgroundColor: 'slategray'}}>
        {renderActiveSection()}
      </div>
    </>
  )
}