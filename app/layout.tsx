import '@momecap/ui-kit-snapmoment/dist/style.css'
import {Metadata} from "next";
import {Header} from "@/widget/header/Header";
import "../src/myApp/styles/index.scss";

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
        <Header/>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
