import CTA from "./components/CTA";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Mockup from "./components/Mockup";
import Navbar from "./components/Navbar";
import Steps from "./components/Steps";

const App = () => {
  return (
    <div className="text-[#1c1c0d] bg-background-light antialiased selection:bg-primary selection:text-black">
      <Navbar />
      <Hero />
      <Mockup />
      <Features />
      <Steps />
      <CTA />
      <Footer />
    </div>
  );
};

export default App;
