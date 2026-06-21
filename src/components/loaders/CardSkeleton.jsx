import Skeleton from "./Skeleton";

function CardSkeleton() {
  return (
    <div className="rounded-3xl border border-cyan-500/10 bg-slate-900 p-6">
      <Skeleton className="mb-4 h-6 w-32" />

      <Skeleton className="mb-2 h-4 w-full" />

      <Skeleton className="h-4 w-5/6" />
    </div>
  );
}

export default CardSkeleton;
