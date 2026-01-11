import ScrollyCanvas from "@/components/ScrollyCanvas";
import AgencyIntro from "@/components/AgencyIntro";
import SkillsConstellation from "@/components/SkillsConstellation";
import Ecosystem from "@/components/Ecosystem";
import Timeline from "@/components/Timeline";
import Process from "@/components/Process";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="w-full">
      {/* Netlify Deployment Trigger */}
      <ScrollyCanvas />
      <AgencyIntro />
      <SkillsConstellation />
      <Ecosystem />
      <Timeline />
      <Process />

      {/* Spacer for Sticky Footer Reveal */}
      <div className="relative z-10 w-full bg-[#121212] h-[100vh]" style={{ pointerEvents: 'none' }}></div>

      <div id="contact" className="relative z-0">
        <Contact />
      </div>
    </main>
  );
}
