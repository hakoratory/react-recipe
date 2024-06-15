import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "React Recipe",
  description: "Reactアプリのレシピ集"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    {/*
    20240615
    rel="stylesheet" は、MetadataAPIでは Unsupported なので直接記入
    https://nextjs.org/docs/app/api-reference/functions/generate-metadata#unsupported-metadata
    */}
    <head>
      <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
    </head>
    <body className={inter.className}>
    <AppRouterCacheProvider>
      {children}
    </AppRouterCacheProvider>
    </body>
    </html>
  );
}
