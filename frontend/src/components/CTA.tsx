import { RiMessage3Fill } from "react-icons/ri";

const CTA = () => {
  return (
    <section className="py-20 px-4">
      <div className="mx-auto max-w-240">
        <div className="relative overflow-hidden rounded-[3rem] bg-black px-6 py-20 text-center text-white md:px-20">
          <div className="absolute top-0 right-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-primary opacity-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/2 translate-y-1/2 rounded-full bg-blue-500 opacity-20 blur-3xl"></div>
          <div className="relative z-10 flex flex-col items-center gap-8">
            <h2 className="text-4xl font-black md:text-5xl">
              Ready for any emergency?
            </h2>
            <p className="max-w-xl md:text-lg text-gray-400">
              Add Triage to your contacts today and ensure peace of mind for you
              and your family.
            </p>
            <a
              href="https://wa.me/+14155238886?text=join%20interest-her"
              target="_blank"
              className="flex h-12 min-w-50 items-center justify-center gap-2 rounded-full bg-primary px-8 text-base font-bold text-black transition-transform hover:scale-105 active:scale-95"
            >
              <RiMessage3Fill className="md:text-2xl" /> Start Chat Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
