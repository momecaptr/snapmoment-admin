"use client"
import {ApolloProvider} from "@apollo/client";
import client from "../../apollo-client";
import {Toaster} from "sonner";
import {SideBar} from "@/widget/sideBar/SideBar";
import s from './layout.module.scss'

export default function NotAuthLayout({
 children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ApolloProvider client={client}>
      <div className={s.layout}>
        {/*<body className={`${geistSans.variable} ${geistMono.variable}`}>*/}
        <div className={s.sidebar}>
          <SideBar/>
        </div>
        <div className={s.content}>
          {children}
        </div>
        <Toaster position={'bottom-left'}/>
      </div>
    </ApolloProvider>
  );
}
