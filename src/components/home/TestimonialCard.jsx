function TestimonialCard({ name, role, comment }) {
  return (
    <div
      className="
        animate__animated
        animate__fadeInUp
        rounded-3xl
        border
        border-border
        bg-card/70
        p-8
        backdrop-blur-xl
        transition
        hover:-translate-y-2
        hover:shadow-2xl
      "
    >
      <p className="mb-6 leading-relaxed text-muted-foreground">“{comment}”</p>

      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-400 font-bold text-white">
          {name.charAt(0)}
        </div>

        <div>
          <h4 className="font-semibold">{name}</h4>

          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
    </div>
  );
}

export default TestimonialCard;
