import { FaCarOn } from "react-icons/fa6";
import { MdContactPhone } from "react-icons/md";
import { RiMessage3Fill } from "react-icons/ri";

const Steps = () => {
  return (
    <section className="py-12 md:py-20" id="how-it-works">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 md:mb-16">
          <h2 className="text-3xl font-black md:text-4xl mb-2">How It Works</h2>
          <p className="text-gray-600">Simple steps to safety</p>
        </div>
        <div className="relative flex flex-col gap-10 md:gap-15">
          {/* Timeline line */}
          <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gray-200 md:left-[50%] md:-ml-0.5 md:top-4"></div>

          {/* Step 1 */}
          <div className="relative flex items-start md:items-center gap-4 md:gap-0">
            {/* Mobile Layout */}
            <div className="hrink-0 flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-primary text-xl font-bold text-black z-10 md:hidden">
              1
            </div>
            <div className="flex-1 md:hidden">
              <div className="flex items-start gap-3 mb-3">
                <div className="h-12 w-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 shrink-0">
                  <MdContactPhone className="text-2xl" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold mb-1">Save the Number</h3>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Add{" "}
                <span className="bg-primary/30 px-1.5 py-0.5 rounded font-mono text-xs">
                  +234 123-456-789
                </span>{" "}
                to your contacts as "Triage".
              </p>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:flex md:w-1/2 md:justify-end md:pr-12">
              <div className="text-right">
                <h3 className="text-2xl font-bold mb-2">Save the Number</h3>
                <p className="text-gray-600">
                  Add{" "}
                  <span className="bg-primary/30 px-1 rounded font-mono">
                    +234 123-456-789
                  </span>{" "}
                  to your contacts as "Triage".
                </p>
              </div>
            </div>
            <div className="hidden md:flex absolute left-[50%] -ml-6 h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-primary text-xl font-bold text-black z-10">
              1
            </div>
            <div className="hidden md:flex md:w-1/2 md:pl-12">
              <div className="h-16 w-16 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400">
                <MdContactPhone className="text-3xl" />
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative flex items-start md:items-center gap-4 md:gap-0">
            {/* Mobile Layout */}
            <div className="shrink-0 flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-black text-xl font-bold text-primary z-10 md:hidden">
              2
            </div>
            <div className="flex-1 md:hidden">
              <div className="flex items-start gap-3 mb-3">
                <div className="h-12 w-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 shrink-0">
                  <RiMessage3Fill className="text-2xl" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold mb-1">Describe Emergency</h3>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Open WhatsApp and type "Help" or describe symptoms in natural
                language.
              </p>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:flex md:w-1/2 md:justify-end md:pr-12">
              <div className="h-16 w-16 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400">
                <RiMessage3Fill className="text-3xl" />
              </div>
            </div>
            <div className="hidden md:flex absolute left-[50%] -ml-6 h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-black text-xl font-bold text-primary z-10">
              2
            </div>
            <div className="hidden md:flex md:w-1/2 md:pl-12">
              <div className="text-left">
                <h3 className="text-2xl font-bold mb-2">Describe Emergency</h3>
                <p className="text-gray-600">
                  Open WhatsApp and type "Help" or describe symptoms in natural
                  language.
                </p>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative flex items-start md:items-center gap-4 md:gap-0">
            {/* Mobile Layout */}
            <div className="shrink-0 flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-primary text-xl font-bold text-black z-10 md:hidden">
              3
            </div>
            <div className="flex-1 md:hidden">
              <div className="flex items-start gap-3 mb-3">
                <div className="h-12 w-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 shrink-0">
                  <FaCarOn className="text-2xl" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold mb-1">Get Help Instantly</h3>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Triage routes you to care and alerts your emergency contacts
                immediately.
              </p>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:flex md:w-1/2 md:justify-end md:pr-12">
              <div className="text-right">
                <h3 className="text-2xl font-bold mb-2">Get Help Instantly</h3>
                <p className="text-gray-600">
                  Triage routes you to care and alerts your emergency contacts
                  immediately.
                </p>
              </div>
            </div>
            <div className="hidden md:flex absolute left-[50%] -ml-6 h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-primary text-xl font-bold text-black z-10">
              3
            </div>
            <div className="hidden md:flex md:w-1/2 md:pl-12">
              <div className="h-16 w-16 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400">
                <FaCarOn className="text-3xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Steps;
