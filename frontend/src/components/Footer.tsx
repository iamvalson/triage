import { MdHealthAndSafety } from "react-icons/md";

const Footer = () => {
  return (
    <footer
      className="border-t border-[#e9e8ce] bg-white py-12 px-4"
      id="about"
    >
      <div className="mx-auto flex max-w-240 flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center justify-center gap-2 md:justify-start">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-black">
              <MdHealthAndSafety className="text-sm" />
            </div>
            <span className="text-lg font-bold">Triage</span>
          </div>
          <p className="text-sm text-gray-500">
            Built for the TOS Innovation Hackathon - SDG 3 Focus.
          </p>
        </div>
        <div className="text-sm text-gray-500">
          © 2025 Triage. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
