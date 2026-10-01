import {
  Home, Newspaper, CalendarDays, Info, Users, Swords, Trophy, Gamepad2,
  UserRound, Award, Images, FileText, Mail, type LucideIcon,
} from "lucide-react";

export interface NavItem { href: string; label: string; icon: LucideIcon }
export interface NavSection { title: string; items: NavItem[] }

export const NAV_SECTIONS: NavSection[] = [
  { title: "CLUB", items: [
    { href: "/", label: "หน้าหลัก", icon: Home },
    { href: "/news", label: "ข่าวสาร", icon: Newspaper },
    { href: "/events", label: "กิจกรรม", icon: CalendarDays },
    { href: "/about", label: "เกี่ยวกับชมรม", icon: Info },
  ]},
  { title: "ESPORTS", items: [
    { href: "/teams", label: "ทีมแข่งขัน", icon: Users },
    { href: "/competitions", label: "ตารางการแข่งขัน", icon: Swords },
    { href: "/results", label: "ผลการแข่งขัน", icon: Trophy },
    { href: "/games", label: "เกม", icon: Gamepad2 },
  ]},
  { title: "COMMUNITY", items: [
    { href: "/members", label: "สมาชิก", icon: UserRound },
    { href: "/achievements", label: "ผลงานและรางวัล", icon: Award },
    { href: "/gallery", label: "Gallery", icon: Images },
  ]},
  { title: "INFORMATION", items: [
    { href: "/documents", label: "เอกสาร", icon: FileText },
    { href: "/contact", label: "ติดต่อเรา", icon: Mail },
  ]},
];

export const BOTTOM_NAV: NavItem[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/news", label: "News", icon: Newspaper },
  { href: "/competitions", label: "Match", icon: Swords },
  { href: "/teams", label: "Teams", icon: Users },
];

export function isActive(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}
