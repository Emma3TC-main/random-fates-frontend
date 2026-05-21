function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div
      className="
        group
        animate__animated
        animate__fadeInUp
        rounded-3xl
        border
        border-border
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
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-500 transition group-hover:scale-110">
        <Icon className="h-7 w-7" />
      </div>

      <h3 className="mb-3 text-2xl font-semibold">{title}</h3>

      <p className="leading-relaxed text-muted-foreground">{description}</p>
    </div>
  );
}

export default FeatureCard;
