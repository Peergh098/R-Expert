import Hero from '../components/home/Hero';
import ServicesSection from '../components/home/ServicesSection';
import HowItWorks from '../components/home/HowItWorks';
import WhyChooseUs from '../components/home/WhyChooseUs';
import HowWeWork from '../components/home/HowWeWork';
import FAQ from '../components/home/FAQ';

const Home = () => {
  return (
    <>
      <Hero />
       <HowItWorks />
      <WhyChooseUs />
      {/* <ServicesSection /> */}
      <HowWeWork />
      <FAQ />
    </>
  );
};

export default Home;
