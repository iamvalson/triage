import { MdHealthAndSafety } from "react-icons/md";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 pt-6 pb-2">
      <div className="relative mx-auto max-w-240 border border-[#e9e8ce] bg-white/90 px-4 md:px-6 py-2 md:py-3 rounded-full backdrop-blur-md">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center gap-2">
            <div className="flex justify-center items-center bg-primary p-1 rounded-full">
              <MdHealthAndSafety className="text-black text-xl md:text-3xl" />
            </div>
            <span className="text-black md:text-lg font-bold tracking-wide">
              Triage
            </span>
          </div>
          <div className="hidden lg:flex flex-row gap-8 items-center">
            <a
              href="#features"
              className="font-medium text-sm hover:text-primary transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="font-medium text-sm hover:text-primary transition-colors"
            >
              How it Works
            </a>
            <a
              href="#about"
              className="font-medium text-sm hover:text-primary transition-colors"
            >
              About
            </a>
          </div>

          <div className="bg-black flex items-center h-9 px-4 rounded-full hover:scale-105 transition-transform">
            <a
              href="https://wa.me/+14155238886"
              className="text-primary font-bold text-sm"
            >
              Start Chat
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
