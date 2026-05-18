import {
  Mail,
  MessageCircle,
  Clock3,
  Shield,
  Sparkles,
  Send,
} from "lucide-react";
import { Link } from "react-router-dom";

import useStartNow from "../hooks/useStartNow";

function Contact() {

  const {handleStartNow} = useStartNow();

  const contactCards = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Correo electrónico",
      description: "Contáctanos para soporte, dudas técnicas o colaboraciones.",
      value: "contact@randomfates.com",
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Comunidad",
      description: "Únete a nuestra comunidad y recibe novedades del proyecto.",
      value: "Discord & Redes Sociales",
    },
    {
      icon: <Clock3 className="h-6 w-6" />,
      title: "Tiempo de respuesta",
      description: "Respondemos consultas lo más rápido posible para ayudarte.",
      value: "Menos de 24 horas",
    },
  ];

  const faqs = [
    {
      title: "¿RandomFates es gratuito?",
      description:
        "Sí, contamos con una modalidad gratuita para empezar a crear sorteos digitales.",
    },
    {
      title: "¿Puedo importar participantes?",
      description:
        "Sí, puedes cargar participantes manualmente o mediante archivos CSV.",
    },
    {
      title: "¿Los resultados son verificables?",
      description:
        "La plataforma utiliza mecanismos transparentes y auditables para garantizar confianza.",
    },
    {
      title: "¿Puedo usarlo en transmisiones en vivo?",
      description:
        "Sí, RandomFates está pensado para experiencias interactivas y en tiempo real.",
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-[#F8FAFC] px-6 py-8 md:px-10">
      {/* BACKGROUND EFFECTS */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute left-0 top-0 h-[450px] w-[450px] rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-sky-400/10 blur-3xl" />
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden rounded-[36px] border border-slate-200 bg-white p-8 shadow-sm md:p-12">
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-cyan-100 blur-3xl opacity-60" />

        <div className="relative z-10 grid gap-10 lg:grid-cols-2 lg:items-center">
          {/* LEFT */}
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
              <Sparkles className="h-4 w-4" />
              Estamos aquí para ayudarte
            </div>

            <h1 className="text-5xl font-bold tracking-tight text-slate-900 md:text-6xl">
              Ponte en contacto con{" "}
              <span className="text-[#40CFFF]">RandomFates</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
              ¿Tienes dudas, sugerencias o necesitas ayuda con la plataforma?
              Nuestro equipo está disponible para ayudarte a crear mejores
              experiencias de sorteos digitales.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button className="rounded-2xl bg-[#40CFFF] px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:brightness-95">
                Contactar soporte
              </button>

              <button className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                Ver documentación
              </button>
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="relative">
            <div className="rounded-[32px] border border-slate-200 bg-slate-950 p-8 shadow-2xl">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/20 text-cyan-400">
                  <Shield className="h-7 w-7" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white">
                    Soporte confiable
                  </h3>

                  <p className="text-sm text-slate-400">
                    Transparencia y asistencia en cada etapa.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  "Ayuda técnica y soporte",
                  "Consultas sobre la plataforma",
                  "Feedback y sugerencias",
                  "Colaboraciones y alianzas",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <div className="h-3 w-3 rounded-full bg-cyan-400" />

                    <span className="text-sm text-slate-200">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-5">
                <p className="text-sm leading-relaxed text-cyan-100">
                  Nuestro objetivo es mantener una comunicación cercana y
                  ofrecer una experiencia profesional para cada usuario de la
                  plataforma.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT CARDS */}
      <section className="mt-12">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-slate-900">
            Canales de contacto
          </h2>

          <p className="mt-3 text-slate-500">
            Diferentes formas de comunicarte con el equipo de RandomFates.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {contactCards.map((card, index) => (
            <div
              key={index}
              className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-600">
                {card.icon}
              </div>

              <h3 className="text-2xl font-bold text-slate-900">
                {card.title}
              </h3>

              <p className="mt-3 leading-relaxed text-slate-500">
                {card.description}
              </p>

              <div className="mt-6 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
                {card.value}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FORM + FAQ */}
      <section className="mt-12 grid gap-6 lg:grid-cols-2">
        {/* FORM */}
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900">
              Envíanos un mensaje
            </h2>

            <p className="mt-3 text-slate-500">
              Completa el formulario y nos pondremos en contacto contigo.
            </p>
          </div>

          <form className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Nombre
              </label>

              <input
                type="text"
                placeholder="Tu nombre"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 outline-none transition focus:border-cyan-400 focus:bg-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Correo electrónico
              </label>

              <input
                type="email"
                placeholder="correo@ejemplo.com"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 outline-none transition focus:border-cyan-400 focus:bg-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Mensaje
              </label>

              <textarea
                rows="6"
                placeholder="Escribe tu mensaje..."
                className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 outline-none transition focus:border-cyan-400 focus:bg-white"
              />
            </div>

            <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#40CFFF] px-6 py-4 font-semibold text-slate-900 shadow-sm transition hover:brightness-95">
              <Send className="h-5 w-5" />
              Enviar mensaje
            </button>
          </form>
        </div>

        {/* FAQ */}
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900">
              Preguntas frecuentes
            </h2>

            <p className="mt-3 text-slate-500">
              Algunas dudas comunes sobre la plataforma.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
              >
                <h3 className="text-lg font-semibold text-slate-900">
                  {faq.title}
                </h3>

                <p className="mt-2 leading-relaxed text-slate-500">
                  {faq.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl bg-slate-950 p-6">
            <h3 className="text-xl font-bold text-white">
              ¿Necesitas ayuda personalizada?
            </h3>

            <p className="mt-3 leading-relaxed text-slate-300">
              Nuestro equipo puede ayudarte con configuraciones, soporte técnico
              y orientación sobre cómo aprovechar mejor RandomFates.
            </p>

            <button className="mt-6 rounded-2xl bg-cyan-400 px-5 py-3 font-semibold text-white transition hover:bg-cyan-500">
              Hablar con soporte
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-12">
        <div className="overflow-hidden rounded-[32px] bg-[#15293E] p-10 shadow-2xl md:p-14">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-bold tracking-tight text-white">
                Construyamos mejores experiencias digitales
              </h2>

              <p className="mt-4 text-lg leading-relaxed text-slate-300">
                RandomFates está diseñado para ayudar a comunidades, streamers,
                marcas y eventos a crear sorteos modernos y transparentes.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="rounded-2xl border border-slate-600 bg-transparent px-6 py-3 font-medium text-white transition hover:bg-white/5">
              <Link to="/about">
              Conocer plataforma
              </Link>

              </button>

              <button
              onClick={handleStartNow}
              className="rounded-2xl bg-[#40CFFF] px-6 py-3 font-semibold text-slate-900 transition hover:brightness-95">
                Empezar ahora
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
