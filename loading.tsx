import { Container } from "@/components/ui/container";
import { CardGridSkeleton, Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <Container className="py-8">
      <Skeleton className="mb-6 h-8 w-56" />
      <CardGridSkeleton />
    </Container>
  );
}
