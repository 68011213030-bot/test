import Link from "next/link";
import { SearchX } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";

export default function NotFound() {
  return (
    <Container className="py-12">
      <EmptyState icon={SearchX} title="ไม่พบหน้าที่ต้องการ"
        description="หน้านี้อาจถูกย้ายหรือยังไม่เปิดให้ใช้งาน"
        action={<Link href="/" className={buttonVariants()}>กลับหน้าหลัก</Link>} />
    </Container>
  );
}
