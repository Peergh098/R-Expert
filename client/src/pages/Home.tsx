import Hero from '../components/home/Hero';
import ServicesSection from '../components/home/ServicesSection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Testimonials from '../components/home/Testimonials';
import CTA from '../components/home/CTA';
import FAQ from '../components/home/FAQ';

const Home = () => {
  return (
    <>
      <Hero />
      <ServicesSection />
      <WhyChooseUs />
      <Testimonials />
      <CTA />
      <FAQ />
    </>
  );
};

export default Home;
