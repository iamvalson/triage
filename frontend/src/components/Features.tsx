import { FaLocationDot } from "react-icons/fa6";
import { RiAlarmWarningFill } from "react-icons/ri";
import { TbStethoscope } from "react-icons/tb";

const Features = () => {
  return (
    <section className="py-20 bg-white" id="features">
      <div className="mx-auto max-w-240 px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">Why Triage?</h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Fast, reliable, and accessible emergency assistance powered by
            advanced AI models tailored for medical triage.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="bg-background-light border border-[#e9e8ce] rounded-4xl p-8 transition-all hover:-translate-y-1 hover:shadow-lg">
            <div className="bg-primary w-14 h-14 mb-4 inline-flex items-center justify-center rounded-full">
              <TbStethoscope className="text-3xl" />
            </div>
            <h3 className="mb-2 text-xl font-bold">AI Symptom Analysis</h3>
            <p className="text-gray-600 text-sm">
              Instant triage based on your described symptoms using
              clinically-trained AI models.
            </p>
          </div>
          <div className="bg-background-light border border-[#e9e8ce] rounded-4xl p-8 transition-all hover:-translate-y-1 hover:shadow-lg">
            <div className="bg-black w-14 h-14 mb-4 inline-flex items-center justify-center rounded-full">
              <FaLocationDot className="text-3xl text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-bold">Specialized Routing</h3>
            <p className="text-gray-600 text-sm">
              Find the nearest open hospitals and specialized clinics instantly
              based on your GPS.
            </p>
          </div>
          <div className=" border border-red-100 bg-red-50 rounded-4xl p-8 transition-all hover:-translate-y-1 hover:shadow-lg">
            <div className="bg-red-600 w-14 h-14 mb-4 inline-flex items-center justify-center rounded-full animate-pulse">
              <RiAlarmWarningFill className="text-3xl text-white" />
            </div>
            <h3 className="mb-2 text-xl text-red-900 font-bold">Smart SOS</h3>
            <p className="text-red-800 text-sm">
              One-tap alert system to notify loved ones and emergency services
              with your vital info.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
