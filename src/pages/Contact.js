import {
  Mail,
  MessageCircle,
  Clock3,
  Shield,
  Sparkles,
  Send,
  ArrowRight,
  BadgeCheck,
  Headphones,
  MessagesSquare,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import "animate.css";

import useStartNow from "../hooks/useStartNow";

function Contact() {
  const { handleStartNow } = useStartNow();

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
        <div className="absolute left-0 top-0 h-[450px] w-[450px] rounded-full bg-cyan-400/10 blur-3xl animate-pulse" />

        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-sky-400/10 blur-3xl animate-pulse" />
      </div>

      {/* HERO */}
      <section className="animate__animated animate__fadeIn relative overflow-hidden rounded-[36px] border border-slate-200 bg-white p-8 shadow-sm transition duration-500 hover:shadow-2xl md:p-12">
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-cyan-100 blur-3xl opacity-60" />

        <div className="absolute bottom-0 left-0 h-56 w-56 rounded-full bg-sky-100 blur-3xl opacity-50" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(64,207,255,0.10),transparent_30%)]" />

        <div className="relative z-10 grid gap-10 lg:grid-cols-2 lg:items-center">
          {/* LEFT */}
          <div className="animate__animated animate__fadeInLeft">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700 shadow-sm">
              <Sparkles className="h-4 w-4 animate-pulse" />
              Estamos aquí para ayudarte
            </div>

            <h1 className="text-5xl font-bold tracking-tight text-slate-900 md:text-6xl">
              Ponte en contacto con{" "}
              <span className="bg-gradient-to-r from-[#40CFFF] to-cyan-400 bg-clip-text text-transparent">
                RandomFates
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
              ¿Tienes dudas, sugerencias o necesitas ayuda con la plataforma?
              Nuestro equipo está disponible para ayudarte a crear mejores
              experiencias de sorteos digitales.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button className="group rounded-2xl bg-[#40CFFF] px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition duration-300 hover:scale-[1.03] hover:brightness-95 hover:shadow-xl">
                <span className="flex items-center gap-2">
                  Contactar soporte
                  <ArrowRight className="h-4 w-4 transition duration-300 group-hover:translate-x-1" />
                </span>
              </button>

              <button className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition duration-300 hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-md">
                Ver documentación
              </button>
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="animate__animated animate__fadeInRight relative">
            <div className="rounded-[32px] border border-slate-200 bg-slate-950 p-8 shadow-2xl transition duration-500 hover:-translate-y-1 hover:shadow-cyan-500/10">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/20 text-cyan-400 transition duration-300 hover:scale-110 hover:rotate-3">
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
                  {
                    icon: <Headphones className="h-4 w-4" />,
                    text: "Ayuda técnica y soporte",
                  },
                  {
                    icon: <MessagesSquare className="h-4 w-4" />,
                    text: "Consultas sobre la plataforma",
                  },
                  {
                    icon: <BadgeCheck className="h-4 w-4" />,
                    text: "Feedback y sugerencias",
                  },
                  {
                    icon: <Zap className="h-4 w-4" />,
                    text: "Colaboraciones y alianzas",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 transition duration-300 hover:border-cyan-400/20 hover:bg-white/10 animate__animated animate__fadeInUp"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300 transition duration-300 group-hover:scale-110">
                      {item.icon}
                    </div>

                    <span className="text-sm text-slate-200">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-5 transition duration-300 hover:bg-cyan-400/15">
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
        <div className="animate__animated animate__fadeInUp mb-8">
          <h2 className="flex items-center gap-3 text-4xl font-bold text-slate-900">
            <Mail className="text-cyan-500" size={34} />
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
              className="group animate__animated animate__fadeInUp rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition duration-500 hover:-translate-y-2 hover:border-cyan-200 hover:shadow-2xl"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-600 transition duration-300 group-hover:scale-110 group-hover:rotate-3">
                {card.icon}
              </div>

              <h3 className="text-2xl font-bold text-slate-900 transition duration-300 group-hover:text-cyan-700">
                {card.title}
              </h3>

              <p className="mt-3 leading-relaxed text-slate-500">
                {card.description}
              </p>

              <div className="mt-6 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition duration-300 group-hover:bg-cyan-50">
                {card.value}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FORM + FAQ */}
      <section className="mt-12 grid gap-6 lg:grid-cols-2">
        {/* FORM */}
        <div className="animate__animated animate__fadeInLeft rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm transition duration-500 hover:shadow-xl">
          <div className="mb-8">
            <h2 className="flex items-center gap-3 text-3xl font-bold text-slate-900">
              <Send className="text-cyan-500" size={28} />
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
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 outline-none transition duration-300 focus:border-cyan-400 focus:bg-white focus:shadow-md"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Correo electrónico
              </label>

              <input
                type="email"
                placeholder="correo@ejemplo.com"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 outline-none transition duration-300 focus:border-cyan-400 focus:bg-white focus:shadow-md"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Mensaje
              </label>

              <textarea
                rows="6"
                placeholder="Escribe tu mensaje..."
                className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 outline-none transition duration-300 focus:border-cyan-400 focus:bg-white focus:shadow-md"
              />
            </div>

            <button className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-[#40CFFF] px-6 py-4 font-semibold text-slate-900 shadow-sm transition duration-300 hover:scale-[1.01] hover:brightness-95 hover:shadow-xl">
              <Send className="h-5 w-5 transition duration-300 group-hover:translate-x-1" />
              Enviar mensaje
            </button>
          </form>
        </div>

        {/* FAQ */}
        <div className="animate__animated animate__fadeInRight rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm transition duration-500 hover:shadow-xl">
          <div className="mb-8">
            <h2 className="flex items-center gap-3 text-3xl font-bold text-slate-900">
              <BadgeCheck className="text-cyan-500" size={28} />
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
                className="group animate__animated animate__fadeInUp rounded-2xl border border-slate-200 bg-slate-50 p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:bg-white hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-slate-900 transition duration-300 group-hover:text-cyan-700">
                  {faq.title}
                </h3>

                <p className="mt-2 leading-relaxed text-slate-500">
                  {faq.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl bg-slate-950 p-6 transition duration-300 hover:shadow-2xl">
            <h3 className="text-xl font-bold text-white">
              ¿Necesitas ayuda personalizada?
            </h3>

            <p className="mt-3 leading-relaxed text-slate-300">
              Nuestro equipo puede ayudarte con configuraciones, soporte técnico
              y orientación sobre cómo aprovechar mejor RandomFates.
            </p>

            <button className="mt-6 rounded-2xl bg-cyan-400 px-5 py-3 font-semibold text-white transition duration-300 hover:scale-[1.03] hover:bg-cyan-500 hover:shadow-lg">
              Hablar con soporte
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="animate__animated animate__fadeInUp mt-12">
        <div className="overflow-hidden rounded-[32px] bg-gradient-to-r from-[#15293E] via-[#19324d] to-[#15293E] p-10 shadow-2xl md:p-14">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="flex items-center gap-3 text-4xl font-bold tracking-tight text-white">
                <Sparkles className="text-cyan-300" size={36} />
                Construyamos mejores experiencias digitales
              </h2>

              <p className="mt-4 text-lg leading-relaxed text-slate-300">
                RandomFates está diseñado para ayudar a comunidades, streamers,
                marcas y eventos a crear sorteos modernos y transparentes.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="rounded-2xl border border-slate-600 bg-transparent px-6 py-3 font-medium text-white transition duration-300 hover:bg-white/5 hover:shadow-lg">
                <Link to="/about">Conocer plataforma</Link>
              </button>

              <button
                onClick={handleStartNow}
                className="group rounded-2xl bg-[#40CFFF] px-6 py-3 font-semibold text-slate-900 transition duration-300 hover:scale-[1.03] hover:brightness-95 hover:shadow-xl"
              >
                <span className="flex items-center gap-2">
                  Empezar ahora
                  <ArrowRight className="h-4 w-4 transition duration-300 group-hover:translate-x-1" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
