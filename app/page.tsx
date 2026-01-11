import ScrollyCanvas from "@/components/ScrollyCanvas";
import AgencyIntro from "@/components/AgencyIntro";
import SkillsConstellation from "@/components/SkillsConstellation";
import Ecosystem from "@/components/Ecosystem";
import CircuitGrid from "@/components/CircuitGrid";
import Timeline from "@/components/Timeline";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import VoltageBootLoader from "@/components/VoltageBootLoader";

export default function Home() {
  return (
    <main className="w-full">
      <VoltageBootLoader />
      {/* Netlify Deployment Trigger */}
      <ScrollyCanvas />
      <AgencyIntro />
      <div id="skills">
        <SkillsConstellation />
      </div>
      <Ecosystem />
      <CircuitGrid />
      <Timeline />
      <Process />

      <div id="contact" className="relative z-10 bg-black">
        <Contact />
      </div>
    </main>
  );
}
