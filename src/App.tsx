import { domAnimation, LazyMotion } from "motion/react";
import { BigPicture } from "./components/BigPicture";
import { Bugs } from "./components/Bugs";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { LoadTime } from "./components/LoadTime";
import { MenuBand } from "./components/MenuBand";
import { Nav } from "./components/Nav";
import { Requirements } from "./components/Requirements";
import { Ticker } from "./components/Ticker";

export default function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Ticker />
        <BigPicture />
        <Requirements />
        <MenuBand />
        <LoadTime />
        <Bugs />
      </main>
      <Footer />
    </LazyMotion>
  );
}
