function WinnerOverlay({ winner, onClose }) {
  if (!winner) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="animate-pop w-full max-w-lg rounded-[36px] bg-white p-10 text-center shadow-2xl">
        
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#40CFFF] text-4xl shadow-lg">
          🎉
        </div>

        <p className="mt-6 text-lg text-slate-500">
          El ganador seleccionado es
        </p>

        <h2 className="mt-3 text-5xl font-bold tracking-tight text-slate-900">
          {winner.name}
        </h2>

        <button
          onClick={onClose}
          className="mt-8 rounded-2xl bg-[#40CFFF] px-6 py-4 font-semibold text-slate-900 transition duration-300 hover:scale-105 hover:brightness-95 active:scale-95"
        >
          Continuar
        </button>

      </div>
    </div>
  );
}

export default WinnerOverlay;