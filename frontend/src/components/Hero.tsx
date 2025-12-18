import { FaWhatsapp } from "react-icons/fa";

const Hero = () => {
  return (
    <header className="relative pt-32 pb-16 md:pt-48 md:pb-24 px-4 overflow-hidden">
      <div className="mx-auto max-w-240 relative z-10">
        <div className="flex flex-col items-center text-center gap-8">
          <div className="inline-flex items-center gap-2 border border-black/10 bg-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            SDG 3: Good Health & Well-being
          </div>

          <h1 className="max-w-3xl text-4xl font-black leading-[1.1] tracking-tighter md:text-7xl">
            Instant Medical Help,
            <br />
            <span className="relative whitespace-nowrap">
              Right in <span className="text-whatsapp">WhatsApp</span>
            </span>
            .
            <div className="mx-auto max-w-200 relative">
              <svg
                className="absolute -bottom-2 left-0 -z-10 h-3 w-full text-primary"
                preserveAspectRatio="none"
                viewBox="0 0 100 10"
              >
                <path
                  d="M0 5 Q 50 10 100 5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                ></path>
              </svg>
            </div>
          </h1>

          <p className="max-w-xl font-normal text-gray-600 md:text-xl">
            24/7 AI-powered triage and emergency routing. Fast, reliable, and
            accessible assistance when you need it most.
          </p>

          <div>
            <a
              href="https://wa.me/+14155238886?text=join%20mixture-ten"
              target="_blank"
              className="group relative flex flex-row h-11 md:h-14 min-w-50 md:min-w-60 items-center justify-center gap-3 overflow-hidden rounded-full bg-whatsapp px-2 md:px-8 text-white transition-all hover:shadow-xl hover:shadow-green-500/20 active:scale-95"
            >
              <span className="absolute inset-0 bg-white/20 translate-y-full transition-transform duration-300 group-hover:translate-y-0"></span>
              <FaWhatsapp className="w-7 h-7" />
              <span className="text-sm md:text-lg font-bold">
                Chat with Triage
              </span>
            </a>
          </div>
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 bg-primary/20 rounded-full blur-3xl"></div>
    </header>
  );
};

export default Hero;
