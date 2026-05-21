import React, { useRef, useState, useEffect } from "react";
import logo from "../../assets/Logo.png";

function HeroWheel() {
  const wheelRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const isDragging = useRef(false);
  const startAngle = useRef(0);
  const currentRotation = useRef(0);

  // Variables para calcular la velocidad del lanzamiento
  const lastAngle = useRef(0);
  const lastTime = useRef(0);
  const velocity = useRef(0);
  const animationFrameId = useRef(null);

  // Guardamos la posición del mouse de forma mutable para leerla en el bucle de físicas
  const currentMousePos = useRef({ x: 0, y: 0 });

  // Velocidad de giro automático por defecto (grados por milisegundo)
  const BASE_AUTO_VELOCITY = 0.025;

  // Función auxiliar para obtener el ángulo en grados respecto al centro de la ruleta
  const getAngle = (clientX, clientY) => {
    if (!wheelRef.current) return 0;
    const rect = wheelRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = clientX - centerX;
    const dy = clientY - centerY;
    return Math.atan2(dy, dx) * (180 / Math.PI);
  };

  const handleMouseDown = (e) => {
    isDragging.current = true;
    velocity.current = 0;

    const angle = getAngle(e.clientX, e.clientY);
    // Bloqueamos instantáneamente la rotación actual para que el arrastre continúe desde ahí
    startAngle.current = angle - currentRotation.current;
    lastAngle.current = angle;
    lastTime.current = performance.now();
    currentMousePos.current = { x: e.clientX, y: e.clientY };
  };

  useEffect(() => {
    let lastFrameTime = performance.now();

    // Loop unificado para el giro automático, arrastre manual e inercia
    const updateWheelPhysics = (now) => {
      const dt = now - lastFrameTime;
      lastFrameTime = now;

      if (isDragging.current) {
        // --- MODO ARRASTRE MANUAL ---
        const angle = getAngle(
          currentMousePos.current.x,
          currentMousePos.current.y,
        );
        let newRotation = angle - startAngle.current;
        currentRotation.current = newRotation;

        // Calcular la velocidad que lleva la mano en este frame
        const deltaT = now - lastTime.current;
        if (deltaT > 0) {
          let deltaAngle = angle - lastAngle.current;
          // Corregir la transición matemática cuando cruza de -180 a 180 grados
          if (deltaAngle > 180) deltaAngle -= 360;
          if (deltaAngle < -180) deltaAngle += 360;

          velocity.current = deltaAngle / deltaT;
        }
        lastAngle.current = angle;
        lastTime.current = now;
      } else {
        // --- MODO GIRO AUTOMÁTICO / INERCIA ---
        if (Math.abs(velocity.current) > BASE_AUTO_VELOCITY) {
          // Si fue lanzada con fuerza, va frenando poco a poco
          currentRotation.current += velocity.current * dt;
          velocity.current *= 0.985; // Coeficiente de fricción
        } else {
          // Si no tiene fuerza o ya se detuvo el lanzamiento, retoma el giro automático constante
          const direction = velocity.current >= 0 ? 1 : -1;
          velocity.current = BASE_AUTO_VELOCITY * direction;
          currentRotation.current += velocity.current * dt;
        }
      }

      // Una sola llamada de renderizado por frame de la pantalla
      setRotation(currentRotation.current);
      animationFrameId.current = requestAnimationFrame(updateWheelPhysics);
    };

    animationFrameId.current = requestAnimationFrame(updateWheelPhysics);

    const handleMouseMove = (e) => {
      if (!isDragging.current) return;
      // Actualizamos continuamente la posición del mouse para que el bucle de físicas la procese
      currentMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      lastFrameTime = performance.now();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  return (
    <div className="relative flex justify-center px-4 py-8 select-none bg-white">
      {/* Soft gradient background - Atenuado drásticamente para fundirse con el fondo blanco */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-white" />
        <div className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-100/10 blur-3xl" />
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-sky-100/10 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Floating badge */}
        <div
          className="
            animate__animated
            animate__fadeInDown
            absolute
            -top-5
            left-1/2
            z-30
            flex
            -translate-x-1/2
            items-center
            gap-2
            rounded-full
            border
            border-slate-100
            bg-white/90
            px-4
            py-2
            shadow-[0_10px_25px_rgba(0,0,0,0.05)]
            backdrop-blur-xl
          "
        >
          {/* Live dot */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
          </span>

          {/* Live text */}
          <span
            className="
              bg-gradient-to-r
              from-red-500
              to-red-700
              bg-clip-text
              text-[11px]
              font-black
              uppercase
              tracking-[0.22em]
              text-transparent
            "
          >
            Live
          </span>

          {/* Participants */}
          <span className="text-sm font-medium text-slate-600">
            248 participantes
          </span>
        </div>

        {/* WHEEL WRAPPER CONTAINER */}
        <div
          ref={wheelRef}
          onMouseDown={handleMouseDown}
          className="
            group
            relative
            aspect-square
            rounded-full
            border
            border-slate-200/60
            bg-white
            p-4
            shadow-[0_15px_45px_rgba(0,0,0,0.06)]
            transition-transform
            duration-300
            active:scale-[0.99]
            hover:scale-[1.01]
            cursor-grab
            active:cursor-grabbing
          "
        >
          {/* Sutil resplandor de fondo al pasar el mouse (Atenuado) */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-200/5 via-sky-200/5 to-transparent blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />

          {/* SVG WHEEL */}
          <svg
            viewBox="0 0 400 400"
            className="relative z-10 h-full w-full will-change-transform"
            style={{
              transform: `rotate(${rotation}deg)`,
              transformOrigin: "200px 200px",
            }}
          >
            <defs>
              {/* Gradients */}
              <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#67e8f9" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>

              <linearGradient id="skyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7dd3fc" />
                <stop offset="100%" stopColor="#2563eb" />
              </linearGradient>

              <linearGradient
                id="greenGrad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#5eead4" />
                <stop offset="100%" stopColor="#14b8a6" />
              </linearGradient>

              <linearGradient
                id="yellowGrad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#fef9c3" />
                <stop offset="100%" stopColor="#fde047" />
              </linearGradient>

              {/* Center */}
              <radialGradient id="centerGrad">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#f8fafc" />
              </radialGradient>

              {/* Inner shadow */}
              <filter
                id="innerShadow"
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
              >
                <feOffset dx="0" dy="3" />
                <feGaussianBlur stdDeviation="4" result="offset-blur" />
                <feComposite
                  operator="out"
                  in="SourceGraphic"
                  in2="offset-blur"
                  result="inverse"
                />
                <feFlood
                  floodColor="#0f172a"
                  floodOpacity="0.12"
                  result="color"
                />
                <feComposite
                  operator="in"
                  in="color"
                  in2="inverse"
                  result="shadow"
                />
                <feComposite operator="over" in="shadow" in2="SourceGraphic" />
              </filter>
            </defs>

            {/* Outer ring */}
            <circle
              cx="200"
              cy="200"
              r="194"
              fill="#ffffff"
              stroke="#e2e8f0"
              strokeWidth="2"
            />

            {/* Decorative ring */}
            <circle
              cx="200"
              cy="200"
              r="184"
              fill="none"
              stroke="#e2e8f0"
              strokeOpacity="0.7"
              strokeWidth="4"
              strokeDasharray="8 6"
            />

            {/* Main slices */}
            <g filter="url(#innerShadow)">
              <path
                d="M 200 200 L 200 20 A 180 180 0 0 1 380 200 Z"
                fill="url(#cyanGrad)"
              />
              <path
                d="M 200 200 L 380 200 A 180 180 0 0 1 200 380 Z"
                fill="url(#skyGrad)"
              />
              <path
                d="M 200 200 L 200 380 A 180 180 0 0 1 20 200 Z"
                fill="url(#greenGrad)"
              />
              <path
                d="M 200 200 L 20 200 A 180 180 0 0 1 200 20 Z"
                fill="url(#yellowGrad)"
              />
            </g>

            {/* Center shadow */}
            <circle cx="200" cy="200" r="70" fill="#ffffff" fillOpacity="0.5" />

            {/* Center glass */}
            <circle
              cx="200"
              cy="200"
              r="60"
              fill="url(#centerGrad)"
              stroke="#cbd5e1"
              strokeWidth="2"
            />

            {/* Logo container */}
            <foreignObject x="154" y="154" width="92" height="92">
              <div className="flex h-full w-full items-center justify-center">
                <div
                  className="
                    rounded-full
                    border
                    border-slate-100
                    bg-white
                    p-2
                    shadow-[0_6px_20px_rgba(0,0,0,0.06)]
                  "
                >
                  <img
                    src={logo}
                    alt="Random Fates Logo"
                    className="
                      h-[62px]
                      w-[62px]
                      object-contain
                      select-none
                      pointer-events-none
                    "
                  />
                </div>
              </div>
            </foreignObject>
          </svg>

          {/* Pointer Indicator */}
          <div className="absolute left-1/2 top-0 z-30 -translate-x-1/2 pointer-events-none">
            {/* Needle */}
            <div
              className="
                h-0
                w-0
                border-l-[14px]
                border-r-[14px]
                border-t-[26px]
                border-l-transparent
                border-r-transparent
                border-t-slate-700
                drop-shadow-[0_4px_8px_rgba(0,0,0,0.12)]
              "
            />
            {/* Pin */}
            <div className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-300 bg-white shadow" />
          </div>

          {/* Floating card */}
          <div
            className="
              absolute
              bottom-8
              right-0
              z-20
              rounded-full
              border
              border-slate-100
              bg-white/90
              px-4
              py-2
              text-xs
              font-semibold
              text-slate-600
              shadow-md
              backdrop-blur-xl
              transition-all
              duration-300
              hover:-translate-y-0.5
              pointer-events-auto
            "
          >
            ✨ Hash verificado
          </div>

          {/* Winner tag */}
          <div
            className="
              absolute
              left-0
              top-1/2
              z-20
              -translate-y-1/2
              rounded-full
              border
              border-slate-100
              bg-white/90
              px-4
              py-2
              text-xs
              font-bold
              text-slate-700
              shadow-md
              backdrop-blur-xl
              transition-all
              duration-300
              hover:-translate-y-0.5
              pointer-events-auto
            "
          >
            #winner 🏆
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroWheel;
