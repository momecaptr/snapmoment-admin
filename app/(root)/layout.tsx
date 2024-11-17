"use client"
import {ApolloProvider} from "@apollo/client";
import client from "../../apollo-client";

export default function HomeLayout({
 children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      {/*<body className={`${geistSans.variable} ${geistMono.variable}`}>*/}
      <ApolloProvider client={client}>
        {children}
      </ApolloProvider>
    </main>
  );
}
