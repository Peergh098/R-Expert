import Hero from '../components/home/Hero';
import ServicesSection from '../components/home/ServicesSection';
import HowItWorks from '../components/home/HowItWorks';
import FAQ from '../components/home/FAQ';

const Home = () => {
  return (
    <>
      <Hero />
      <ServicesSection />
      <HowItWorks />
      {/* <Testimonials /> */}
      {/* <CTA /> */}
      <FAQ />
    </>
  );
};

export default Home;
