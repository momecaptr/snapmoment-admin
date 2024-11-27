"use client"
import {ApolloProvider} from "@apollo/client";
import client from "../../apollo-client";
import {Toaster} from "sonner";

export default function HomeLayout({
 children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {/*<body className={`${geistSans.variable} ${geistMono.variable}`}>*/}
      <ApolloProvider client={client}>
        {children}
        <Toaster position={'bottom-left'} />
      </ApolloProvider>
    </div>
  );
}
