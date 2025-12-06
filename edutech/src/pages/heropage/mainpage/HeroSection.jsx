import React from "react";
import Hero from "../heroComponents/Hero";
import Features from "../heroComponents/Features";
import About from "../heroComponents/About";
import HowItWorks from "../heroComponents/HowItWorks";
import Testimonials from "../heroComponents/Testtimonials";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

const HeroSection = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <About />
      <HowItWorks />
      <Testimonials />
      <Footer />
    </>
  );
};

export default HeroSection;
