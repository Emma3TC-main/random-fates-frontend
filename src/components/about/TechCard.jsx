import { Layers3 } from "lucide-react";

function TechCard({ tech }) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-xl animate__animated animate__fadeInUp">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-100 transition duration-300 group-hover:scale-110 group-hover:bg-cyan-200">
          <Layers3
            size={22}
            className="text-cyan-600"
          />
        </div>

        <div>
          <span className="block font-semibold text-slate-800">
            {tech.name}
          </span>

          <span className="text-xs text-slate-400">
            Tecnología moderna
          </span>
        </div>
      </div>
    </div>
  );
}

export default TechCard;