import { Activity, Users, Trophy, ShieldCheck } from "lucide-react";

function LiveActivitySection() {
  const activities = [
    {
      title: "Roulette #2041",
      status: "RUNNING",
      players: "248",
      icon: Activity,
    },
    {
      title: "Slots #883",
      status: "LIVE",
      players: "91",
      icon: Trophy,
    },
    {
      title: "Random Draw #712",
      status: "VERIFIED",
      players: "431",
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center animate__animated animate__fadeInUp">
          <span className="mb-4 inline-block rounded-full bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-500">
            Actividad en vivo
          </span>

          <h2 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
            Monitoreo en tiempo real
          </h2>

          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Observa participantes, estados y resultados mientras los sorteos
            ocurren.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {activities.map((activity) => {
            const Icon = activity.icon;

            return (
              <div
                key={activity.title}
                className="
                  animate__animated
                  animate__fadeInUp
                  rounded-3xl
                  border
                  border-cyan-400/10
                  bg-card/70
                  p-8
                  backdrop-blur-xl
                  transition
                  duration-300
                  hover:-translate-y-2
                  hover:border-cyan-400/20
                  hover:shadow-2xl
                "
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-400">
                    <Icon className="h-7 w-7" />
                  </div>

                  <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-400">
                    {activity.status}
                  </span>
                </div>

                <h3 className="mb-3 text-2xl font-semibold">
                  {activity.title}
                </h3>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-5 w-5 text-cyan-400" />
                  {activity.players} participantes
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default LiveActivitySection;
