import React from "react";
import {
  Header,
  Hero,
  LimLedgers,
  ScrollToTop,
  Footer,
} from "../components/index";

const Home = () => {
  return (
    <div>
      <Header />
      <Hero />
      <LimLedgers />
      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default Home;
