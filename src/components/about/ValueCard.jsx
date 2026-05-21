import { Sparkles } from "lucide-react";

function ValueCard({ value }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-500 hover:-translate-y-2 hover:border-cyan-200 hover:shadow-2xl animate__animated animate__fadeInUp">
      {/* glow */}
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-100 opacity-0 blur-3xl transition duration-500 group-hover:opacity-100" />

      <div className="relative z-10">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-100 transition duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-cyan-200">
          <Sparkles size={28} className="text-cyan-600" />
        </div>

        <h3 className="text-xl font-bold text-slate-900 transition duration-300 group-hover:text-cyan-700">
          {value.title}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-slate-500">
          {value.description}
        </p>
      </div>
    </div>
  );
}

export default ValueCard;
