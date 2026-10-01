"use client";

import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Container className="py-12">
      <EmptyState icon={TriangleAlert} title="โหลดข้อมูลไม่สำเร็จ"
        description="เกิดข้อผิดพลาดระหว่างดึงข้อมูล ลองโหลดใหม่อีกครั้ง หากยังไม่หาย กรุณาแจ้งเจ้าหน้าที่ชมรม"
        action={<Button onClick={reset}>ลองอีกครั้ง</Button>} />
    </Container>
  );
}
