import Skeleton from "./Skeleton";

function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate__animated animate__fadeIn">
      {/* HEADER */}
      <div>
        <Skeleton className="mb-4 h-10 w-72" />
        <Skeleton className="h-5 w-96" />
      </div>

      {/* STATS */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="rounded-3xl border border-cyan-500/10 bg-slate-900 p-6"
          >
            <Skeleton className="mb-6 h-5 w-28" />

            <Skeleton className="h-10 w-20" />
          </div>
        ))}
      </div>

      {/* LIVE GAMES */}
      <div>
        <Skeleton className="mb-6 h-8 w-48" />

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="rounded-3xl border border-cyan-500/10 bg-slate-900 p-6"
            >
              <Skeleton className="mb-5 h-6 w-40" />

              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardSkeleton;
