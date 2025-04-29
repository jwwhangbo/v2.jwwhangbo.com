import { draftMode } from "next/headers";

import Navigation from "@/components/Globals/Navigation/Navigation";
import { ViewProvider } from "@/components/Globals/Providers/NavigationProvider";
import Link from "next/link";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled } = await draftMode();

  return (
    <div className="lg:grid lg:grid-cols-[33%_auto] lg:gap-[40px]">
      <ViewProvider>
        <Navigation />
        <section className="lg:mr-10">
          {children}
          <footer className="py-24">
            <p className="max-w-[48%] text-sm">
              Designed using <Link href="https://figma.com">Figma</Link>,
              Brought to life using{" "}
              <Link href="https://nextjs.org/">NextJS</Link>. Content
              delivered through Headless{" "}
              <Link href="https://wordpress.com/">Wordpress</Link>
            </p>
          </footer>
        </section>
      </ViewProvider>
    </div>
  );
}
