import { draftMode } from "next/headers";
import { Inter } from "next/font/google";

import "@/app/globals.css";

import Navigation from "@/components/Globals/Navigation/Navigation";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled } = await draftMode();

  return (
    <html lang="en">
      <body className={inter.className}>
        {/* {isEnabled && <PreviewNotice />} */}
        <Navigation />
        <section className="px-3 lg:px-0 h-[2000px]">{children}</section>
      </body>
    </html>
  );
}
