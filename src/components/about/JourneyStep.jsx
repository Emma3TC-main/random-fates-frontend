import { ArrowRight } from "lucide-react";

function JourneyStep({ item }) {
  return (
    <div className="group flex gap-4 animate__animated animate__fadeInLeft">
      <div className="relative flex flex-col items-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#40CFFF] font-bold text-slate-900 shadow-md transition duration-300 group-hover:scale-110 group-hover:rotate-3">
          {item.step}
        </div>

        <div className="mt-2 h-full w-[2px] rounded-full bg-slate-200" />
      </div>

      <div className="flex-1 rounded-2xl border border-transparent p-1 transition duration-300 group-hover:border-cyan-100">
        <div className="flex items-center gap-2">
          <h4 className="font-semibold text-slate-900">{item.title}</h4>

          <ArrowRight
            size={16}
            className="text-cyan-500 opacity-0 transition duration-300 group-hover:translate-x-1 group-hover:opacity-100"
          />
        </div>

        <p className="mt-2 text-sm leading-relaxed text-slate-500">
          {item.desc}
        </p>
      </div>
    </div>
  );
}

export default JourneyStep;
