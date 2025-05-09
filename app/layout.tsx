import '@momecap/ui-kit-snapmoment/dist/style.css'
import {Metadata} from "next";
import {Header} from "@/widget";
import "../src/myApp/styles/index.scss";
import { Providers } from '../src/providers/Providers';
import {Suspense} from "react"; // Клиентский компонент с провайдерами

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/*<body className={`${geistSans.variable} ${geistMono.variable}`}>*/}
      <head>
        <link rel="icon" data-rh={'true'} href="./favicon.ico"/>
      </head>
      <body>
        {/* Оборачиваем всё приложение в клиентский компонент Providers */}
        <Providers>
          <Suspense>
            <Header/>
          </Suspense>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
