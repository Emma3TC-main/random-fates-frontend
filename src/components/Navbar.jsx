import { Link, useLocation } from "react-router-dom";
import logo from "../assets/Logo.png";
import { getAuthUser, logoutUser } from "../services/authService";

function Navbar() {
  const location = useLocation();

  // obtener usuario autenticado
  const user = getAuthUser();

  const linkClass = (path) =>
    `
    relative
    rounded-2xl
    px-4
    py-2.5
    text-sm
    font-medium
    transition-all
    duration-300
    ease-out

    after:absolute
    after:bottom-1
    after:left-1/2
    after:h-px
    after:w-0
    after:-translate-x-1/2
    after:bg-white/70
    after:transition-all
    after:duration-300

    hover:text-white
    hover:bg-white/10
    hover:after:w-6

    active:scale-[0.98]

    ${
      location.pathname === path
        ? `
          bg-white/90
          text-slate-900
          shadow-[0_2px_12px_rgba(255,255,255,0.15)]
        `
        : `
          text-white/90
        `
    }
  `;

  return (
    <header
      className="
        sticky
        top-0
        z-50
        border-b
        border-[#42DEE1]/20
        bg-gradient-to-r
        from-[#3FC5F0]/95
        via-[#42DEE1]/95
        to-[#3FC5F0]/95
        backdrop-blur-xl
        shadow-[0_4px_24px_rgba(0,0,0,0.08)]

        animate__animated
        animate__fadeInDown
      "
    >
      {/* Glow Effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* LEFT GLOW */}
        <div
          className="
            absolute
            -left-10
            top-0
            h-32
            w-32
            rounded-full
            bg-[#EEF5B2]/15
            blur-3xl
            animate-pulse
          "
        />

        {/* RIGHT GLOW */}
        <div
          className="
            absolute
            right-0
            top-0
            h-32
            w-32
            rounded-full
            bg-[#6DECB9]/15
            blur-3xl
            animate-pulse
          "
        />

        {/* CENTER LIGHT */}
        <div
          className="
            absolute
            left-1/2
            top-0
            h-20
            w-[420px]
            -translate-x-1/2
            bg-white/5
            blur-3xl
          "
        />
      </div>

      <nav
        role="navigation"
        className="
          relative
          mx-auto
          flex
          max-w-7xl
          items-center
          justify-between
          px-6
          py-4
        "
      >
        {/* LOGO */}
        <Link
          to="/"
          className="
            group
            flex
            items-center
            gap-4
            transition-all
            duration-300
            animate__animated
            animate__fadeInLeft
          "
        >
          <div className="relative">
            {/* GLOW */}
            <div
              className="
                absolute
                inset-0
                rounded-full
                bg-[#EEF5B2]/25
                blur-xl
                transition
                duration-500
                group-hover:bg-[#EEF5B2]/35
              "
            />

            {/* ICON */}
            <div
              className="
                relative
                flex
                h-14
                w-14
                items-center
                justify-center
                overflow-hidden
                rounded-2xl
                border
                border-white/20
                bg-white/10
                shadow-lg
                backdrop-blur
                transition-all
                duration-300

                group-hover:-translate-y-[1px]
                group-hover:shadow-xl
              "
            >
              {/* SHINE */}
              <div
                className="
                  absolute
                  inset-0
                  -translate-x-full
                  bg-gradient-to-r
                  from-transparent
                  via-white/20
                  to-transparent
                  transition-transform
                  duration-1000
                  group-hover:translate-x-full
                "
              />

              <img
                src={logo}
                alt="RandomFates logo"
                className="
                  relative
                  h-10
                  w-10
                  object-contain
                  transition-transform
                  duration-300
                  group-hover:scale-105
                "
              />
            </div>
          </div>

          {/* TEXT */}
          <div className="hidden sm:block">
            <h1
              className="
                text-lg
                font-bold
                tracking-tight
                text-white
                transition
                duration-300
              "
            >
              RandomFates
            </h1>

            <p
              className="
                text-xs
                text-white/80
                transition
                duration-300
                group-hover:text-white/90
              "
            >
              Sorteos digitales modernos
            </p>
          </div>
        </Link>

        {/* NAVIGATION */}
        <div
          className="
            hidden
            items-center
            gap-1.5
            rounded-[1.6rem]
            border
            border-white/10
            bg-white/[0.03]
            px-2
            py-1.5
            backdrop-blur-xl
            transition-all
            duration-300

            animate__animated
            animate__fadeIn

            lg:flex
          "
        >
          <Link to="/" className={linkClass("/")}>
            Home
          </Link>

          <Link to="/about" className={linkClass("/about")}>
            About
          </Link>

          <Link to="/dashboard" className={linkClass("/dashboard")}>
            Dashboard
          </Link>

          <Link to="/games" className={linkClass("/games")}>
            Games
          </Link>

          <Link to="/raffles" className={linkClass("/raffles")}>
            Raffles
          </Link>

          <Link to="/contact" className={linkClass("/contact")}>
            Contact
          </Link>
        </div>

        {/* ACTIONS */}
        <div
          className="
            flex
            items-center
            gap-3
            animate__animated
            animate__fadeInRight
          "
        >
          {user ? (
            <>
              <span
                className="
                  hidden
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.06]
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-white
                  backdrop-blur-xl
                  transition-all
                  duration-300

                  hover:bg-white/[0.1]

                  md:block
                "
              >
                Hola, {user.nombre}
              </span>

              <button
                onClick={() => {
                  logoutUser();
                  window.location.href = "/login";
                }}
                className="
                  rounded-2xl
                  border
                  border-white/15
                  bg-white/[0.06]
                  px-5
                  py-2.5
                  text-sm
                  font-medium
                  text-white
                  backdrop-blur-xl
                  transition-all
                  duration-300

                  hover:bg-white/[0.12]
                  hover:text-white
                  hover:-translate-y-[1px]

                  active:scale-[0.98]
                "
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="
                  rounded-2xl
                  border
                  border-white/15
                  bg-white/[0.06]
                  px-5
                  py-2.5
                  text-sm
                  font-medium
                  text-white
                  backdrop-blur-xl
                  transition-all
                  duration-300

                  hover:bg-white/[0.12]
                  hover:text-white
                  hover:-translate-y-[1px]

                  active:scale-[0.98]
                "
              >
                Login
              </Link>

              <Link
                to="/register"
                className="
                  hidden
                  rounded-2xl
                  bg-[#EEF5B2]
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  text-slate-900

                  shadow-[0_6px_24px_rgba(238,245,178,0.22)]

                  transition-all
                  duration-300

                  hover:-translate-y-[1px]
                  hover:brightness-[0.98]

                  active:scale-[0.98]

                  md:block
                "
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
