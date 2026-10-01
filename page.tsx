import { ClipboardPenLine, Swords, Trophy, Info, Users, FileText, Mail, LayoutGrid, Lightbulb } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { IconTile } from "@/components/ui/icon-tile";
import { LinkRow } from "@/components/ui/link-row";
import { getHeroBanner, getSiteSettings } from "@/lib/data/public";

export default async function HomePage() {
  const [banner, settings] = await Promise.all([getHeroBanner(), getSiteSettings()]);
  return (
    <Container className="space-y-6 pt-4 lg:pt-6">
      <Hero banner={banner} contact={settings.contact} />
      <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
        <Card className="p-5">
          <div className="mb-4 flex items-center gap-3">
            <IconTile icon={LayoutGrid} />
            <h2 className="text-lg font-bold text-navy">เมนูด่วน</h2>
          </div>
          <div className="space-y-2.5">
            <LinkRow href="/join" icon={ClipboardPenLine} title="สมัครเข้าชมรม" subtitle="กรอกข้อมูลเพื่อเป็นสมาชิก MSU E-SPORTS" />
            <LinkRow href="/competitions" icon={Swords} title="ตารางการแข่งขัน" subtitle="ดูแมตช์ที่กำลังจะมาถึง" />
            <LinkRow href="/results" icon={Trophy} title="ผลการแข่งขัน" subtitle="ผลและสถิติของทีมชมรม" />
          </div>
        </Card>
        <Card className="p-5">
          <div className="mb-4 flex items-center gap-3">
            <IconTile icon={Lightbulb} />
            <h2 className="text-lg font-bold text-navy">ข้อมูลที่ควรรู้</h2>
          </div>
          <div className="space-y-1">
            <LinkRow tone="soft" href="/about" icon={Info} title="เกี่ยวกับชมรม" />
            <LinkRow tone="soft" href="/teams" icon={Users} title="ทีมแข่งขัน" />
            <LinkRow tone="soft" href="/documents" icon={FileText} title="เอกสาร" />
            <LinkRow tone="soft" href="/contact" icon={Mail} title="ติดต่อเรา" />
          </div>
        </Card>
      </div>
    </Container>
  );
}
