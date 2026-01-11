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
      <div id="skills">
        <SkillsConstellation />
      </div>
      <Ecosystem />
      <Timeline />
      <Process />

      <div className="relative z-10 w-full" style={{ marginBottom: '100vh', backgroundColor: '#121212' }}>
        {/* Last Content Block (just empty div to ensure bg covers footer) */}
        <div className="h-24 bg-[#121212]" />
      </div>

      <div id="contact" className="fixed bottom-0 left-0 w-full h-screen z-0">
        <Contact />
      </div>
    </main>
  );
}
