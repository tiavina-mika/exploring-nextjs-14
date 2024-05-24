import Container from "@/components/Container";
import { Skeleton } from "@/components/ui/Skeleton";

const LogoutLoading = () => {
  return (
    <Container className="flex flex-col items-center gap-3">
      <Skeleton className="h-16 w-1/2"/>
      <Skeleton className="h-40 w-full"/>
      <Skeleton className="h-40 w-full"/>
      <div className="flex items-center self-stretch gap-3">
        <Skeleton className="h-10 w-1/2" />
        <Skeleton className="h-10 w-1/2" />
      </div>
    </Container>
  )
}

export default LogoutLoading;
