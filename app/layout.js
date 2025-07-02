import { Toaster } from "react-hot-toast";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Blog Posts UI",
  description: "Simple Blog Application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`  bg-gray-950 text-gray-200 min-h-screen`}
      >
        <Navbar />
        <main className="container mx-auto px-4 py-8">{children}</main>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
