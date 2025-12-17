import mockupImg from "../assets/screen.png";

const Mockup = () => {
  return (
    <section className="px-4 pb-20 overflow-hidden">
      <div className="mx-auto max-w-240">
        <img
          src={mockupImg}
          alt="Mockup view of Triage"
          className="rounded-xl"
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>
    </section>
  );
};

export default Mockup;
