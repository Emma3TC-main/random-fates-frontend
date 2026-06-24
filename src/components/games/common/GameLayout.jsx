function GameLayout({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F8FAFC] px-6 py-8 md:px-10">
      
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-120px] top-[-120px] h-[300px] w-[300px] rounded-full bg-cyan-300/20 blur-3xl" />

        <div className="absolute bottom-[-120px] right-[-120px] h-[300px] w-[300px] rounded-full bg-blue-400/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {children}
      </div>
    </div>
  );
}

export default GameLayout;