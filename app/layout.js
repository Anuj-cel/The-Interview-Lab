import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { InterviewProvider } from "@/utils/context";
import { Toaster } from "sonner";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AI Interviewer Mockup",
  description: "An AI-powered mock interview platform to help you prepare for your next big interview.",
};

export default function RootLayout({ children }) {
    if (typeof global.navigator === 'undefined') global.navigator = {};
    
  return (
    <InterviewProvider>
      <ClerkProvider>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        {children}
         <Toaster />
      </body>
    </html>
    </ClerkProvider>
        </InterviewProvider>
  );
}
