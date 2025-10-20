import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "User Manager App",
    description:
        "A simple CRUD app using REST API and Fake JSONPlaceholder",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fa" dir="rtl">
            <body className="bg-gray-100 text-gray-800">
                {children}
            </body>
        </html>
    );
}
