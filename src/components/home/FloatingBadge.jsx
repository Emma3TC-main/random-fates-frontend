function FloatingBadge({ children, position = "" }) {
  return (
    <div
      className={`
        absolute
        z-20
        rounded-full
        border
        border-border
        bg-card/90
        px-4
        py-2
        text-xs
        shadow-2xl
        backdrop-blur-xl
        animate__animated
        animate__fadeIn
        ${position}
      `}
    >
      {children}
    </div>
  );
}

export default FloatingBadge;
