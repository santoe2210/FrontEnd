import { Roboto } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { config } from "@fortawesome/fontawesome-svg-core";
import MainLayout from "@/components/Layout/MainLayout";
import Navbar from "@/components/Layout/Navbar";
import Sidebar from "@/components/Layout/Sidebar";
import Footer from "@/components/Layout/Footer";
import { Toaster } from "@/components/ui/toaster";
import ProgressProvider from "@/components/Layout/ProgressProvider";
import { ContextProvider } from "./context/ContextProvider";
config.autoAddCss = false;

const roboto = Roboto({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
  // display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>
          UniVoice Magazine: Your Campus's Premier Source for Academic Insights
          and Student Perspectives
        </title>
        <meta
          name="title"
          content="UniVoice Magazine: Your Campus's Premier Source for Academic Insights and Student Perspectives"
        />
        <meta
          name="description"
          content="Explore the vibrant world of academia and student life with UniVoice Magazine. Discover insightful articles, thought-provoking essays, and engaging perspectives from the heart of your campus community. Stay informed, inspired, and connected with the voices shaping the future of education."
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://metatags.io/" />
        <meta
          property="og:title"
          content="UniVoice Magazine: Your Campus's Premier Source for Academic Insights and Student Perspectives"
        />
        <meta
          property="og:description"
          content="Explore the vibrant world of academia and student life with UniVoice Magazine. Discover insightful articles, thought-provoking essays, and engaging perspectives from the heart of your campus community. Stay informed, inspired, and connected with the voices shaping the future of education."
        />
        <meta
          property="og:image"
          content="https://metatags.io/images/meta-tags.png"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://metatags.io/" />
        <meta
          property="twitter:title"
          content="UniVoice Magazine: Your Campus's Premier Source for Academic Insights and Student Perspectives"
        />
        <meta
          property="twitter:description"
          content="Explore the vibrant world of academia and student life with UniVoice Magazine. Discover insightful articles, thought-provoking essays, and engaging perspectives from the heart of your campus community. Stay informed, inspired, and connected with the voices shaping the future of education."
        />
        <meta
          property="twitter:image"
          content="https://metatags.io/images/meta-tags.png"
        />
      </head>
      <body
        className={cn("bg-gray-200 antialiased font-sans", roboto.variable)}
      >
        <ContextProvider>
          <ProgressProvider>
            <Navbar />
            <Sidebar />
            <MainLayout>{children}</MainLayout>
            {/* <Footer /> */}
            <Toaster />
          </ProgressProvider>
        </ContextProvider>
      </body>
    </html>
  );
}
