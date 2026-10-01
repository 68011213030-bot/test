import { AppShell } from "@/components/layout/AppShell";
import { Header } from "@/components/layout/Header";
import { MobileChrome } from "@/components/layout/MobileChrome";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/layout/BackToTop";
import { getSiteSettings } from "@/lib/data/public";

export const revalidate = 300;

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();
  return (
    <AppShell logoUrl={settings.logoUrl}>
      <MobileChrome logoUrl={settings.logoUrl} />
      <Header contact={settings.contact} social={settings.social} />
      <main id="main" className="min-h-[70vh] scroll-mt-20 pb-6">{children}</main>
      <Footer settings={settings} />
      <BackToTop />
    </AppShell>
  );
}
