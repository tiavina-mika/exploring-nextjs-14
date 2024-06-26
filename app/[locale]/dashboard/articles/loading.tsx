import Card from "@/components/Card";
import Container from "@/components/Container";
import { CardContent } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";

const ArticlesLoading = () => {
  return (
    <Container className="flex gap-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i} className="w-[350px] rounded-sm">
          <CardContent className="flex flex-row justify-between items-center align-stretch">
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-8 w-1/4" />
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}

export default ArticlesLoading
