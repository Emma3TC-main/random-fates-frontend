import { CheckCircle2 } from "lucide-react";

function FeatureItem({ item }) {
  return (
    <div className="group flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 transition duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:bg-white hover:shadow-lg animate__animated animate__fadeInUp">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-100 transition duration-300 group-hover:scale-110 group-hover:bg-cyan-200">
        <CheckCircle2 size={18} className="text-cyan-600" />
      </div>

      <span className="text-sm font-medium leading-relaxed text-slate-700">
        {item.text}
      </span>
    </div>
  );
}

export default FeatureItem;
