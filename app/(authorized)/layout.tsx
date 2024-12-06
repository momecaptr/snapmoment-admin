"use client"
import {ApolloProvider} from "@apollo/client";
import client from "../../apollo-client";
import {Toaster} from "sonner";
import {SideBar} from "@/widget";
import s from './layout.module.scss'
import {Suspense} from "react";

export default function NotAuthLayout({
 children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ApolloProvider client={client}>
      <Suspense>
        <div className={s.layout}>
          <div className={s.sidebar}>
            <SideBar/>
          </div>
          <div className={s.content}>
            {children}
          </div>
          <Toaster position={'bottom-left'}/>
        </div>
      </Suspense>
    </ApolloProvider>
  );
}
