import ScrollyCanvas from "@/components/ScrollyCanvas";
import AgencyIntro from "@/components/AgencyIntro";
import Ecosystem from "@/components/Ecosystem";
import Process from "@/components/Process";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="w-full">
      <ScrollyCanvas />
      <AgencyIntro />
      <Ecosystem />
      <Process />
      <div id="contact">
        <Contact />
      </div>
    </main>
  );
}
