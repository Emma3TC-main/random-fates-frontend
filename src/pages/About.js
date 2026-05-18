import { useEffect, useState } from "react";

import FeatureItem from "../components/about/FeatureItem";
import JourneyStep from "../components/about/JourneyStep";
import TechCard from "../components/about/TechCard";
import ValueCard from "../components/about/ValueCard";
import useStartNow from "../hooks/useStartNow";

function About() {
  const {handleStartNow} = useStartNow();

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
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <p className="text-slate-500 text-lg">Cargando información...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-6 py-8 md:px-10">
      {/* HERO */}
      <div className="relative overflow-hidden rounded-[36px] border border-slate-200 bg-white p-8 shadow-sm md:p-12">
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-cyan-100 blur-3xl opacity-60" />

        <div className="relative z-10 max-w-4xl">
          <div className="mb-4 inline-flex items-center rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
            Acerca de nosotros
          </div>

          <h1 className="text-5xl font-bold tracking-tight text-slate-900 md:text-6xl">
            Conoce <span className="text-[#40CFFF]">RandomFates</span>
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            RandomFates nace como una solución moderna para transformar la forma
            en que se realizan sorteos digitales. Nuestro objetivo es ofrecer
            una plataforma accesible, transparente y visualmente atractiva para
            creadores de contenido, comunidades, empresas y eventos online.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button 
            onClick={handleStartNow}
            className="rounded-2xl bg-[#40CFFF] px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:brightness-95">
              Explorar plataforma
            </button>

            <button className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
              Ver características
            </button>
          </div>
        </div>
      </div>

      {/* ABOUT + PURPOSE */}
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {/* MISSION */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-4 inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
            NUESTRA MISIÓN
          </div>

          <h2 className="text-3xl font-bold text-slate-900">
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
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-4 inline-flex rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
            NUESTRA VISIÓN
          </div>

          <h2 className="text-3xl font-bold text-slate-900">
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
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700"
              >
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* VALUES */}
      <div className="mt-12">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-slate-900">
            Lo que define a RandomFates
          </h2>

          <p className="mt-3 text-slate-500">
            Construimos la plataforma alrededor de principios enfocados en
            confianza, simplicidad y experiencia digital.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {aboutData?.values.map((value) => (
            <ValueCard key={value.id} value={value} />
          ))}
        </div>
      </div>

      {/* STORY + TECH */}
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {/* STORY */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-bold text-slate-900">
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
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-bold text-slate-900">
            Tecnología detrás del sistema
          </h2>

          <p className="mt-4 leading-relaxed text-slate-600">
            Utilizamos herramientas modernas para construir una plataforma
            rápida y escalable.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {aboutData?.technologies.map((tech) => (
              <TechCard key={tech.id} tech={tech} />
            ))}
          </div>

          <div className="mt-8 rounded-2xl bg-slate-50 p-5">
            <h4 className="font-semibold text-slate-900">
              Arquitectura moderna
            </h4>

            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              RandomFates utiliza una arquitectura desacoplada frontend/backend.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12 rounded-[32px] bg-[#15293E] p-8 md:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-white">
              Más que sorteos, experiencias digitales
            </h2>

            <p className="mt-3 text-slate-300">
              En RandomFates trabajamos para ofrecer herramientas modernas,
              accesibles y transparentes.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="rounded-2xl border border-slate-600 bg-transparent px-5 py-3 text-sm font-medium text-white transition hover:bg-white/5">
              Saber más
            </button>

            <button 
            onClick={handleStartNow}
            className="rounded-2xl bg-[#40CFFF] px-5 py-3 text-sm font-semibold text-slate-900 transition hover:brightness-95">
              Probar plataforma
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
