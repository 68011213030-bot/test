import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const TITLE = "MSU E-SPORTS | ชมรมอีสปอร์ตมหาวิทยาลัยมหาสารคาม";
const DESCRIPTION =
  "เว็บไซต์อย่างเป็นทางการของชมรมอีสปอร์ต มหาวิทยาลัยมหาสารคาม ข่าวสาร กิจกรรม การแข่งขัน ทีม และผลงานของชมรม";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s | MSU E-SPORTS" },
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, siteName: "MSU E-SPORTS", locale: "th_TH", type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded focus:bg-msu focus:px-3 focus:py-2">
          ข้ามไปยังเนื้อหา
        </a>
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
