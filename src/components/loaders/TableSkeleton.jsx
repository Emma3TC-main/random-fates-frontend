import Skeleton from "./Skeleton";

function TableSkeleton() {
  return (
    <div className="rounded-3xl border border-cyan-500/10 bg-slate-900 p-8">
      <div className="space-y-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="grid grid-cols-4 gap-4">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TableSkeleton;
