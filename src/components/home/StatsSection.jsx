function StatsSection() {
  const stats = [
    {
      value: "2.4M+",
      label: "Participantes",
    },
    {
      value: "98K+",
      label: "Sorteos ejecutados",
    },
    {
      value: "99.9%",
      label: "Disponibilidad",
    },
    {
      value: "120+",
      label: "Comunidades",
    },
  ];

  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="
                animate__animated
                animate__fadeInUp
                rounded-3xl
                border
                border-cyan-400/10
                bg-card/60
                p-8
                text-center
                backdrop-blur-xl
              "
            >
              <h2 className="mb-2 text-5xl font-bold text-cyan-400">
                {stat.value}
              </h2>

              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsSection;
