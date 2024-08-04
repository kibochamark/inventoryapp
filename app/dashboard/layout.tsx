import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner"
import { ReactQueryProvider } from "@/components/reactqueryprovider";
import Header from "@/components/layout/Header";
import { auth } from "@/auth";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Inventory app",
    description: "simple inventory app that displays the latest stock inventory in kiboshop",
};

export default async function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (

        <div className="flex min-h-screen w-full flex-col ">
            <Header />
            {children}
        </div>

    );
}
