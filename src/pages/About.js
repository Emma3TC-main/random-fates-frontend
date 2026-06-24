import { useEffect, useState } from "react";
import "animate.css";

import {
  Sparkles,
  ShieldCheck,
  Rocket,
  Cpu,
  Globe,
  Zap,
  BadgeCheck,
  ArrowRight,
  Workflow,
} from "lucide-react";

import FeatureItem from "../components/about/FeatureItem";
import JourneyStep from "../components/about/JourneyStep";
import TechCard from "../components/about/TechCard";
import ValueCard from "../components/about/ValueCard";
import useStartNow from "../hooks/useStartNow";

function About() {
  const { handleStartNow } = useStartNow();

  const [aboutData, setAboutData] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch("/about.json");

        const data = await response.json();

        setAboutData(data);
      } catch (error) {
        console.log("Error cargando datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
        <div className="animate__animated animate__fadeIn flex flex-col items-center gap-5">
          <div className="relative">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-cyan-100 border-t-[#40CFFF]" />

            <div className="absolute inset-0 rounded-full bg-cyan-200/30 blur-xl" />
          </div>

          <p className="animate-pulse text-lg font-medium text-slate-500">
            Cargando información...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-sky-50 to-slate-100 px-6 py-8 md:px-10">
      {/* HERO */}
      <div className="animate__animated animate__fadeIn relative overflow-hidden rounded-[36px] border border-slate-200 bg-white p-8 shadow-sm transition duration-500 hover:shadow-2xl md:p-12">
        {/* ambient */}
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-cyan-100 blur-3xl opacity-60" />

        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-sky-100 blur-3xl opacity-50" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(64,207,255,0.10),transparent_30%)]" />

        {/* floating blur */}
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-100/20 blur-3xl" />

        <div className="relative z-10 max-w-4xl">
          {/* BADGE */}
          <div className="animate__animated animate__fadeInDown mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-100/80 px-4 py-2 text-sm font-semibold text-cyan-700 shadow-sm backdrop-blur">
            <Sparkles size={16} className="animate-pulse" />
            Acerca de nosotros
          </div>

          {/* TITLE */}
          <h1 className="animate__animated animate__fadeInUp text-5xl font-bold tracking-tight text-slate-900 md:text-6xl">
            Conoce{" "}
            <span className="bg-gradient-to-r from-[#40CFFF] via-cyan-400 to-sky-400 bg-clip-text text-transparent">
              RandomFates
            </span>
          </h1>

          {/* DESCRIPTION */}
          <p className="animate__animated animate__fadeInUp mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            RandomFates nace como una solución moderna para transformar la forma
            en que se realizan sorteos digitales. Nuestro objetivo es ofrecer
            una plataforma accesible, transparente y visualmente atractiva para
            creadores de contenido, comunidades, empresas y eventos online.
          </p>

          {/* STATS */}
          <div className="animate__animated animate__fadeInUp mt-8 flex flex-wrap gap-4">
            {[
              {
                title: "Transparencia",
                icon: ShieldCheck,
              },
              {
                title: "Experiencia moderna",
                icon: Workflow,
              },
              {
                title: "Escalable",
                icon: Rocket,
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-lg"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-100 transition duration-300 group-hover:scale-110 group-hover:bg-cyan-200">
                    <Icon size={18} className="text-cyan-600" />
                  </div>

                  <span className="text-sm font-semibold text-slate-700">
                    {item.title}
                  </span>
                </div>
              );
            })}
          </div>

          {/* BUTTONS */}
          <div className="animate__animated animate__fadeInUp mt-10 flex flex-wrap gap-4">
            <button
              onClick={handleStartNow}
              className="group rounded-2xl bg-[#40CFFF] px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition duration-300 hover:scale-[1.03] hover:brightness-95 hover:shadow-2xl active:scale-[0.98]"
            >
              <span className="flex items-center gap-2">
                Explorar plataforma

                <ArrowRight
                  size={16}
                  className="transition duration-300 group-hover:translate-x-1"
                />
              </span>
            </button>

            <button className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-slate-50 hover:shadow-lg">
              Ver características
            </button>
          </div>
        </div>
      </div>

      {/* ABOUT + PURPOSE */}
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {/* MISSION */}
        <div className="animate__animated animate__fadeInLeft rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition duration-500 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-2xl">
          <div className="mb-4 inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 shadow-sm">
            NUESTRA MISIÓN
          </div>

          <h2 className="flex items-center gap-3 text-3xl font-bold text-slate-900">
            <ShieldCheck className="text-cyan-500" size={28} />
            Simplificar los sorteos digitales
          </h2>

          <p className="mt-5 leading-relaxed text-slate-600">
            Creemos que realizar un sorteo profesional no debería requerir
            procesos manuales, herramientas complicadas o conocimientos técnicos
            avanzados.
          </p>

          <div className="mt-8 space-y-4">
            {aboutData?.missionFeatures.map((item) => (
              <FeatureItem key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* VISION */}
        <div className="animate__animated animate__fadeInRight rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition duration-500 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-2xl">
          <div className="mb-4 inline-flex rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700 shadow-sm">
            NUESTRA VISIÓN
          </div>

          <h2 className="flex items-center gap-3 text-3xl font-bold text-slate-900">
            <Globe className="text-cyan-500" size={28} />
            Una nueva forma de interactuar
          </h2>

          <p className="mt-5 leading-relaxed text-slate-600">
            Buscamos convertir los sorteos en experiencias dinámicas, confiables
            y visualmente memorables.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {aboutData?.visionFeatures.map((item) => (
              <div
                key={item.id}
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700 transition duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:bg-cyan-50 hover:text-slate-900 hover:shadow-lg"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 h-2.5 w-2.5 rounded-full bg-cyan-400 transition duration-300 group-hover:scale-150" />

                  <span className="leading-relaxed">{item.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* VALUES */}
      <div className="mt-12">
        <div className="animate__animated animate__fadeInUp mb-8">
          <h2 className="flex items-center gap-3 text-4xl font-bold text-slate-900">
            <BadgeCheck className="text-cyan-500" size={34} />
            Lo que define a RandomFates
          </h2>

          <p className="mt-3 text-slate-500">
            Construimos la plataforma alrededor de principios enfocados en
            confianza, simplicidad y experiencia digital.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {aboutData?.values.map((value) => (
            <div
              key={value.id}
              className="transition duration-500 hover:-translate-y-2"
            >
              <ValueCard value={value} />
            </div>
          ))}
        </div>
      </div>

      {/* STORY + TECH */}
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {/* STORY */}
        <div className="animate__animated animate__fadeInLeft rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition duration-500 hover:border-cyan-200 hover:shadow-2xl">
          <h2 className="flex items-center gap-3 text-3xl font-bold text-slate-900">
            <Rocket className="text-cyan-500" size={28} />
            Cómo comenzó RandomFates
          </h2>

          <p className="mt-4 leading-relaxed text-slate-600">
            El proyecto surge a partir de la necesidad de contar con una
            herramienta más profesional y transparente.
          </p>

          <div className="mt-8 space-y-6">
            {aboutData?.journey.map((item) => (
              <JourneyStep key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* TECH */}
        <div className="animate__animated animate__fadeInRight rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition duration-500 hover:border-cyan-200 hover:shadow-2xl">
          <h2 className="flex items-center gap-3 text-3xl font-bold text-slate-900">
            <Cpu className="text-cyan-500" size={28} />
            Tecnología detrás del sistema
          </h2>

          <p className="mt-4 leading-relaxed text-slate-600">
            Utilizamos herramientas modernas para construir una plataforma
            rápida y escalable.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {aboutData?.technologies.map((tech) => (
              <div
                key={tech.id}
                className="transition duration-300 hover:scale-[1.03]"
              >
                <TechCard tech={tech} />
              </div>
            ))}
          </div>

          <div className="group mt-8 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-cyan-50 p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-100 transition duration-300 group-hover:scale-110">
                <Workflow size={22} className="text-cyan-600" />
              </div>

              <div>
                <h4 className="font-semibold text-slate-900">
                  Arquitectura moderna
                </h4>

                <p className="mt-1 text-sm leading-relaxed text-slate-500">
                  RandomFates utiliza una arquitectura desacoplada
                  frontend/backend.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="animate__animated animate__fadeInUp mt-12 overflow-hidden rounded-[32px] bg-gradient-to-r from-[#15293E] via-[#19324d] to-[#15293E] p-8 shadow-2xl md:p-10">
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="flex items-center gap-3 text-3xl font-bold text-white">
              <Zap className="text-cyan-300" size={32} />
              Más que sorteos, experiencias digitales
            </h2>

            <p className="mt-3 text-slate-300">
              En RandomFates trabajamos para ofrecer herramientas modernas,
              accesibles y transparentes.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="rounded-2xl border border-slate-600 bg-transparent px-5 py-3 text-sm font-medium text-white transition duration-300 hover:bg-white/10 hover:shadow-lg">
              Saber más
            </button>

            <button
              onClick={handleStartNow}
              className="group rounded-2xl bg-[#40CFFF] px-5 py-3 text-sm font-semibold text-slate-900 transition duration-300 hover:scale-[1.03] hover:brightness-95 hover:shadow-2xl"
            >
              <span className="flex items-center gap-2">
                Probar plataforma

                <ArrowRight
                  size={16}
                  className="transition duration-300 group-hover:translate-x-1"
                />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;